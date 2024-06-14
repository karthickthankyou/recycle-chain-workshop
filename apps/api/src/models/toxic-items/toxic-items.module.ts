import { Module } from '@nestjs/common'
import { ToxicItemsService } from './graphql/toxic-items.service'
import { ToxicItemsResolver } from './graphql/toxic-items.resolver'
import { ToxicItemsController } from './rest/toxic-items.controller'

@Module({
  providers: [ToxicItemsResolver, ToxicItemsService],
  exports: [ToxicItemsService],
  controllers: [ToxicItemsController],
})
export class ToxicItemsModule {}
