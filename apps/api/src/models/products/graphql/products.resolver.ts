import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { ProductsService } from './products.service'
import { Product } from './entity/product.entity'
import { FindManyProductArgs, FindUniqueProductArgs } from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Manufacturer } from 'src/models/manufacturers/graphql/entity/manufacturer.entity'
import { ProductItem } from 'src/models/product-items/graphql/entity/product-item.entity'
import { ToxicItem } from 'src/models/toxic-items/graphql/entity/toxic-item.entity'
import { ProductWhereInput } from './dtos/where.args'
import { ProductStatus } from '@prisma/client'

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Product], { name: 'products' })
  findAll(@Args() args: FindManyProductArgs) {
    return this.productsService.findAll(args)
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args() args: FindUniqueProductArgs) {
    return this.productsService.findOne(args)
  }

  @ResolveField(() => Manufacturer)
  manufacturer(@Parent() product) {
    return this.prisma.manufacturer.findUnique({
      where: { id: product.manufacturerId },
    })
  }

  @ResolveField(() => [ProductItem])
  productItems(@Parent() product: Product) {
    return this.prisma.productItem.findMany({
      where: { productId: product.id },
    })
  }

  @ResolveField(() => [ToxicItem])
  toxicItems(@Parent() product: Product) {
    return this.prisma.toxicItem.findMany({
      where: { productId: product.id },
    })
  }

  @ResolveField(() => Number, {
    name: 'totalCount',
  })
  async totalCount(@Parent() parent: Product) {
    return this.prisma.productItem.count({
      where: { productId: parent.id },
    })
  }

  @Query(() => Number, { name: 'productsCount' })
  async productsCount(
    @Args('where', { nullable: true })
    where: ProductWhereInput,
  ) {
    return this.prisma.product.count({ where })
  }

  @ResolveField(() => Number, {
    name: 'getCountPerStatus',
  })
  async getCountPerStatus(
    @Parent() parent: Product,
    @Args('status', { type: () => ProductStatus }) status: ProductStatus,
  ) {
    return this.prisma.productItem.count({
      where: {
        status,
        productId: parent.id,
      },
    })
  }
}
