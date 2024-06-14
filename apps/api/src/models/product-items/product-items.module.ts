import { Module } from '@nestjs/common'
import { ProductItemsService } from './graphql/product-items.service'
import { ProductItemsResolver } from './graphql/product-items.resolver'
import { ProductItemsController } from './rest/product-items.controller'

@Module({
  providers: [ProductItemsResolver, ProductItemsService],
  exports: [ProductItemsService],
  controllers: [ProductItemsController],
})
export class ProductItemsModule {}
