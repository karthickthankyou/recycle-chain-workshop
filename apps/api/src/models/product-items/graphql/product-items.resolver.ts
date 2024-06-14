import { Resolver, Query, Args } from '@nestjs/graphql'
import { ProductItemsService } from './product-items.service'
import { ProductItem } from './entity/product-item.entity'
import {
  FindManyProductItemArgs,
  FindUniqueProductItemArgs,
} from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => ProductItem)
export class ProductItemsResolver {
  constructor(
    private readonly productItemsService: ProductItemsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [ProductItem], { name: 'productItems' })
  findAll(@Args() args: FindManyProductItemArgs) {
    return this.productItemsService.findAll(args)
  }

  @Query(() => ProductItem, { name: 'productItem' })
  findOne(@Args() args: FindUniqueProductItemArgs) {
    return this.productItemsService.findOne(args)
  }
}
