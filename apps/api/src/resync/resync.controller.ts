import {
  Controller,
  Post,
  Headers,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { ListenerService } from 'src/listener/listener.service'

@Controller('resync-blockchain-data')
export class ResyncController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly listenerService: ListenerService,
  ) {}

  @Post()
  async resyncBlockchainData(@Headers('x-api-secret') apiSecret: string) {
    if (apiSecret !== process.env.API_SECRET) {
      throw new ForbiddenException()
    }

    console.log('Resetting database...')

    try {
      // Delete all tables data
      await this.prisma.transaction.deleteMany()
      await this.prisma.productItem.deleteMany()
      await this.prisma.toxicItem.deleteMany()
      await this.prisma.product.deleteMany()
      await this.prisma.manufacturer.deleteMany()

      console.log('All tables cleared.')

      await this.listenerService.resyncBlockchainData()
      return { message: 'Database reset successfully.' }
    } catch (error) {
      console.error('Error resetting the database:', error)
      throw new InternalServerErrorException()
    }

    return 'Resyncing DB'
  }
}
