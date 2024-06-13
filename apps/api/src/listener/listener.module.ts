import { Module } from '@nestjs/common'
import { ListenerService } from './listener.service'

@Module({
  providers: [ListenerService],
})
export class ListenerModule {}
