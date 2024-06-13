import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ethers } from 'ethers'
import {
  RecycleChain,
  RecycleChain__factory,
} from '../../../../standalone/recycle-chain-contract/typechain-types'
import { contractAddress } from 'src/common/util'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { ProductStatus } from '@prisma/client'

const statusMapping = [
  ProductStatus.MANUFACTURED,
  ProductStatus.SOLD,
  ProductStatus.RETURNED,
  ProductStatus.RECYCLED,
]

@Injectable()
export class ListenerService implements OnModuleInit, OnModuleDestroy {
  private provider: ethers.WebSocketProvider
  private contract: RecycleChain

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    //   Initialize web socket provider
    this.initializeWebSocketProvider()
    // Setup the event subscriber
    this.subscribeToEvents()
  }

  onModuleDestroy() {
    this.cleanup()
  }

  initializeWebSocketProvider() {
    const infuraWssUrl = `wss://polygon-amoy.infura.io/ws/v3/${process.env.INFURA_KEY}`
    this.provider = new ethers.WebSocketProvider(infuraWssUrl)

    this.contract = RecycleChain__factory.connect(
      contractAddress,
      this.provider,
    )
  }

  subscribeToEvents() {
    try {
      this.contract.on(
        this.contract.filters.ManufacturerRegistered,
        async (id, name, location, contact, event) => {
          // @ts-expect-error The blockNumber does not exist inside event.blockNumber
          const blockNumber = event.log.blockNumber
          const timestamp = await this.getBlockTimeStamp(blockNumber)

          await this.createManufacturer({
            contact,
            id,
            location,
            name,
            timestamp,
          })
        },
      )
      console.log('Event: ManufacturerRegistered Listening...')
    } catch (error) {
      console.error(
        'Event: ManufacturerRegistered: Listener setup failed.',
        error,
      )
    }

    try {
      this.contract.on(
        this.contract.filters.ProductCreated,
        async (productId, name, manufacturer, event) => {
          // @ts-expect-error The blockNumber does not exist inside event.blockNumber
          const blockNumber = event.log.blockNumber
          const timestamp = await this.getBlockTimeStamp(blockNumber)

          await this.createProduct({
            manufacturer,
            name,
            productId: productId.toString(),
            timestamp,
          })
        },
      )
      console.log('Event: ProductCreated Listening...')
    } catch (error) {
      console.error('Event: ProductCreated: Listener setup failed.', error)
    }

    try {
      this.contract.on(
        this.contract.filters.ProductItemsAdded,
        async (productItemIds, productId, event) => {
          // @ts-expect-error The blockNumber does not exist inside event.blockNumber
          const timestamp = await this.getBlockTimeStamp(event.log.blockNumber)

          const items = await this.createProductItems({
            productId: productId.toString(),
            productItemIds,
            timestamp,
          })

          console.log('items', items)
        },
      )
      console.log('Event: ProductItemsAdded Listening...')
    } catch (error) {
      console.error('Event: ProductItemsAdded: Listener setup failed.', error)
    }

    try {
      this.contract.on(
        this.contract.filters.ProductItemsStatusChanged,
        async (productItemIds, statusIndex, event) => {
          // @ts-expect-error The blockNumber does not exist inside event.blockNumber
          const timestamp = await this.getBlockTimeStamp(event.log.blockNumber)

          await this.updateProductItemStatus({
            productItemIds,
            statusIndex: +statusIndex.toString(),
            timestamp,
          })
        },
      )
      console.log('Event: ProductItemsStatusChanged Listening...')
    } catch (error) {
      console.error(
        'Event: ProductItemsStatusChanged: Listener setup failed.',
        error,
      )
    }

    try {
      this.contract.on(
        this.contract.filters.ToxicItemCreated,
        async (productId, name, weight, event) => {
          // @ts-expect-error The blockNumber does not exist inside event.blockNumber
          const timestamp = await this.getBlockTimeStamp(event.log.blockNumber)

          await this.createToxicItem({
            name,
            productId: productId.toString(),
            weight: Number(weight.toString()),
            timestamp,
          })
        },
      )
      console.log('Event: ToxicItemCreated Listening...')
    } catch (error) {
      console.error('Event: ToxicItemCreated: Listener setup failed.', error)
    }
  }

  cleanup() {
    this.provider.removeAllListeners()
  }

  // utils
  async getBlockTimeStamp(blockNumber: number) {
    const block = await this.provider.getBlock(blockNumber)
    return new Date(block.timestamp * 1000)
  }

  /**
   * DB Writes
   */

  private async createManufacturer({
    id,
    name,
    location,
    contact,
    timestamp,
  }: {
    id: string
    name: string
    location: string
    contact: string
    timestamp: Date
  }) {
    const manufacturer = await this.prisma.manufacturer.create({
      data: {
        id,
        timestamp,
        contact,
        location,
        name,
      },
    })
    console.log('Manufacturer created: ', manufacturer)
  }

  private async createProduct({
    manufacturer,
    name,
    productId,
    timestamp,
  }: {
    manufacturer: string
    name: string
    productId: string
    timestamp: Date
  }) {
    const product = await this.prisma.product.create({
      data: {
        id: productId,
        name,
        timestamp,
        manufacturer: {
          connect: {
            id: manufacturer,
          },
        },
      },
    })
    console.log('Product created: ', product)
  }

  private createProductItems({
    productId,
    productItemIds,
    timestamp,
  }: {
    productItemIds: string[]
    productId: string
    timestamp: Date
  }) {
    const transactions = productItemIds.map((productItemId) => {
      return this.prisma.transaction.create({
        data: {
          status: ProductStatus.MANUFACTURED,
          productItemId,
          timestamp,
        },
      })
    })
    const productItemUpdates = this.prisma.productItem.createMany({
      data: productItemIds.map((id) => ({
        id,
        productId: productId.toString(),
        status: ProductStatus.MANUFACTURED,
        timestamp,
      })),
    })
    return this.prisma.$transaction([productItemUpdates, ...transactions])
  }

  private updateProductItemStatus({
    statusIndex,
    productItemIds,
    timestamp,
  }: {
    statusIndex: number
    productItemIds: string[]
    timestamp: Date
  }) {
    const status = statusMapping[+statusIndex.toString()] as ProductStatus

    const transactions = productItemIds.map((productItemId) => {
      return this.prisma.transaction.create({
        data: {
          status,
          productItemId,
          timestamp,
        },
      })
    })

    const productItemUpdates = this.prisma.productItem.updateMany({
      data: { status, timestamp },
      where: { id: { in: productItemIds } },
    })

    return this.prisma.$transaction([productItemUpdates, ...transactions])
  }

  private async createToxicItem({
    productId,
    name,
    weight,
    timestamp,
  }: {
    productId: string
    name: string
    weight: number
    timestamp: Date
  }) {
    const maxRetries = 5
    let retryCount = 0
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms))

    while (retryCount < maxRetries) {
      const product = await this.prisma.product.findUnique({
        where: {
          id: productId,
        },
      })

      if (product) {
        const toxicItem = await this.prisma.toxicItem.create({
          data: {
            name,
            weight,
            productId,
            timestamp,
          },
        })
        console.log('Toxic item created: ', toxicItem)
        return
      } else {
        console.error(
          `Product with ID ${productId} not found. Retrying (${retryCount + 1}/${maxRetries})...`,
        )
        await delay(1000) // Wait for 1 second before retrying
        retryCount++
      }
    }
  }
}
