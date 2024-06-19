import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ethers } from 'ethers'
import { RecycleChain, RecycleChain__factory } from '../common/typechain-types'
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
    if (!this.contract) {
      throw new Error('Contract is not initialized')
    }
    try {
      this.contract.on(
        this.contract.filters.ManufacturerRegistered,
        async (id, name, location, contact, event) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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

  async resyncBlockchainData() {
    if (!this.contract) {
      throw new Error('Contract is not initialized')
    }

    const fromBlock = 0
    const toBlock = 'latest'

    // 1. ManufacturerRegistered events

    const manufacturerRegisteredEvents = await this.contract.queryFilter(
      this.contract.filters.ManufacturerRegistered,
      fromBlock,
      toBlock,
    )

    for (const event of manufacturerRegisteredEvents) {
      const [id, name, location, contact] = event.args
      const timestamp = await this.getBlockTimeStamp(event.blockNumber)

      await this.createManufacturer({
        contact,
        id,
        location,
        name,
        timestamp,
      })
    }

    //   2. ProductCreated events

    const productCreatedEvents = await this.contract.queryFilter(
      this.contract.filters.ProductCreated,
      fromBlock,
      toBlock,
    )

    for (const event of productCreatedEvents) {
      const [productId, name, manufacturer] = event.args
      const timestamp = await this.getBlockTimeStamp(event.blockNumber)

      await this.createProduct({
        manufacturer,
        name,
        productId: productId.toString(),
        timestamp,
      })
    }

    // Query and handle ProductItemsAdded events
    const productItemsAddedEvents = await this.contract.queryFilter(
      this.contract.filters.ProductItemsAdded,
      fromBlock,
      toBlock,
    )
    for (const event of productItemsAddedEvents) {
      const [productItemIds, productId] = event.args
      const timestamp = await this.getBlockTimeStamp(event.blockNumber)

      await this.createProductItems({
        productId: productId.toString(),
        productItemIds,
        timestamp,
      })
    }

    // Query and handle ProductItemsStatusChanged events
    const productItemsStatusChangedEvents = await this.contract.queryFilter(
      this.contract.filters.ProductItemsStatusChanged,
      fromBlock,
      toBlock,
    )

    for (const event of productItemsStatusChangedEvents) {
      const [productItemIds, statusIndex] = event.args
      const timestamp = await this.getBlockTimeStamp(event.blockNumber)

      await this.updateProductItemStatus({
        productItemIds,
        statusIndex: +statusIndex.toString(),
        timestamp,
      })
    }

    // Query and handle ToxicItemCreated events
    const toxicItemCreatedEvents = await this.contract.queryFilter(
      this.contract.filters.ToxicItemCreated(),
      fromBlock,
      toBlock,
    )
    for (const event of toxicItemCreatedEvents) {
      const [productId, name, weight] = event.args
      const timestamp = await this.getBlockTimeStamp(event.blockNumber)

      await this.createToxicItem({
        name,
        productId: productId.toString(),
        weight: +weight.toString(),
        timestamp,
      })
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
