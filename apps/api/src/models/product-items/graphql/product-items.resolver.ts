import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { ProductItemsService } from './product-items.service'
import { ProductItem } from './entity/product-item.entity'
import {
  FindManyProductItemArgs,
  FindUniqueProductItemArgs,
} from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Product } from 'src/models/products/graphql/entity/product.entity'
import { Transaction } from 'src/models/transactions/graphql/entity/transaction.entity'
import { ProductItemWhereInput } from './dtos/where.args'

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

  @ResolveField(() => Product)
  product(@Parent() productItem: ProductItem) {
    return this.prisma.product.findUnique({
      where: { id: productItem.productId },
    })
  }

  @ResolveField(() => [Transaction])
  transactions(@Parent() productItem: ProductItem) {
    return this.prisma.transaction.findMany({
      where: { productItemId: productItem.id },
    })
  }

  @Query(() => Number, { name: 'productItemsCount' })
  async productItemsCount(
    @Args('where', { nullable: true })
    where: ProductItemWhereInput,
  ) {
    return this.prisma.productItem.count({ where })
  }
}
