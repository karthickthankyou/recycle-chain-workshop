import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ManufacturerOrderByWithRelationInput } from 'src/models/manufacturers/graphql/dtos/order-by.args'
import { ProductItemOrderByRelationAggregateInput } from 'src/models/product-items/graphql/dtos/order-by.args'
import { ToxicItemOrderByRelationAggregateInput } from 'src/models/toxic-items/graphql/dtos/order-by.args'

@InputType()
export class ProductOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      ProductOrderByWithRelationInputStrict,
      Prisma.ProductOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  timestamp: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  name: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  manufacturerId: Prisma.SortOrder
  manufacturer: ManufacturerOrderByWithRelationInput
  productItems: ProductItemOrderByRelationAggregateInput
  toxicItems: ToxicItemOrderByRelationAggregateInput
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class ProductOrderByWithRelationInput extends PartialType(
  ProductOrderByWithRelationInputStrict,
) {}

@InputType()
export class ProductOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
