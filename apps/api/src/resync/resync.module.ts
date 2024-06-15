import { Module } from '@nestjs/common'
import { ResyncController } from './resync.controller'
import { ListenerModule } from 'src/listener/listener.module'

@Module({
  imports: [ListenerModule],
  controllers: [ResyncController],
})
export class ResyncModule {}
