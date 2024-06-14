import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { ToxicItemsService } from './toxic-items.service'
import { ToxicItem } from './entity/toxic-item.entity'
import {
  FindManyToxicItemArgs,
  FindUniqueToxicItemArgs,
} from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Product } from 'src/models/products/graphql/entity/product.entity'

@Resolver(() => ToxicItem)
export class ToxicItemsResolver {
  constructor(
    private readonly toxicItemsService: ToxicItemsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [ToxicItem], { name: 'toxicItems' })
  findAll(@Args() args: FindManyToxicItemArgs) {
    return this.toxicItemsService.findAll(args)
  }

  @Query(() => ToxicItem, { name: 'toxicItem' })
  findOne(@Args() args: FindUniqueToxicItemArgs) {
    return this.toxicItemsService.findOne(args)
  }

  @ResolveField(() => Product)
  product(@Parent() toxicItem: ToxicItem) {
    return this.prisma.product.findUnique({
      where: { id: toxicItem.productId },
    })
  }
}
