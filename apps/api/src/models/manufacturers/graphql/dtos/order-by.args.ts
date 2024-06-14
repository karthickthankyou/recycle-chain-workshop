import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ProductOrderByRelationAggregateInput } from 'src/models/products/graphql/dtos/order-by.args'

@InputType()
export class ManufacturerOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      ManufacturerOrderByWithRelationInputStrict,
      Prisma.ManufacturerOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  timestamp: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  name: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  location: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  contact: Prisma.SortOrder
  products: ProductOrderByRelationAggregateInput
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class ManufacturerOrderByWithRelationInput extends PartialType(
  ManufacturerOrderByWithRelationInputStrict,
) {}

@InputType()
export class ManufacturerOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
