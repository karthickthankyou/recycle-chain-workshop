import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ProductItemOrderByWithRelationInput } from 'src/models/product-items/graphql/dtos/order-by.args'

@InputType()
export class TransactionOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      TransactionOrderByWithRelationInputStrict,
      Prisma.TransactionOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  timestamp: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  productItemId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  status: Prisma.SortOrder
  productItem: ProductItemOrderByWithRelationInput
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class TransactionOrderByWithRelationInput extends PartialType(
  TransactionOrderByWithRelationInputStrict,
) {}

@InputType()
export class TransactionOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
