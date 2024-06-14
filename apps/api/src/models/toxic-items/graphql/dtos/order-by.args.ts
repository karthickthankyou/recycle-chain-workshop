import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ProductOrderByWithRelationInput } from 'src/models/products/graphql/dtos/order-by.args'

@InputType()
export class ToxicItemOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      ToxicItemOrderByWithRelationInputStrict,
      Prisma.ToxicItemOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  timestamp: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  name: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  weight: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  productId: Prisma.SortOrder
  Product: ProductOrderByWithRelationInput
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class ToxicItemOrderByWithRelationInput extends PartialType(
  ToxicItemOrderByWithRelationInputStrict,
) {}

@InputType()
export class ToxicItemOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
