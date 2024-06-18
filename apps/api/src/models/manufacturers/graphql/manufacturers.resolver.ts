import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { ManufacturersService } from './manufacturers.service'
import { Manufacturer } from './entity/manufacturer.entity'
import {
  FindManyManufacturerArgs,
  FindUniqueManufacturerArgs,
} from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Product } from 'src/models/products/graphql/entity/product.entity'
import { ManufacturerWhereInput } from './dtos/where.args'
import { ProductStatus } from '@prisma/client'

@Resolver(() => Manufacturer)
export class ManufacturersResolver {
  constructor(
    private readonly manufacturersService: ManufacturersService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Manufacturer], { name: 'manufacturers' })
  findAll(@Args() args: FindManyManufacturerArgs) {
    return this.manufacturersService.findAll(args)
  }

  @Query(() => Manufacturer, { name: 'manufacturer' })
  findOne(@Args() args: FindUniqueManufacturerArgs) {
    return this.manufacturersService.findOne(args)
  }

  @ResolveField(() => [Product])
  products(@Parent() manufacturer: Manufacturer) {
    return this.prisma.product.findMany({
      where: { manufacturerId: manufacturer.id },
    })
  }

  @Query(() => Number, { name: 'manufacturersCount' })
  async manufacturersCount(
    @Args('where', { nullable: true })
    where: ManufacturerWhereInput,
  ) {
    return this.prisma.manufacturer.count({ where })
  }

  @ResolveField(() => Number, {
    name: 'totalCount',
  })
  async totalCount(@Parent() manufacturer: Manufacturer) {
    return this.prisma.productItem.count({
      where: {
        product: { manufacturerId: manufacturer.id },
      },
    })
  }

  @ResolveField(() => Number, {
    name: 'getCountPerStatus',
  })
  async getCountPerStatus(
    @Parent() parent: Manufacturer,
    @Args('status', { type: () => ProductStatus }) status: ProductStatus,
  ) {
    return this.prisma.productItem.count({
      where: {
        status,
        product: { manufacturerId: parent.id },
      },
    })
  }

  @ResolveField(() => Number, {
    name: 'productsCount',
  })
  async productsCount(@Parent() manufacturer: Manufacturer) {
    return this.prisma.product.count({
      where: {
        manufacturerId: manufacturer.id,
      },
    })
  }
}
