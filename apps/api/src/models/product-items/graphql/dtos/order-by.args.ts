import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { ProductOrderByWithRelationInput } from 'src/models/products/graphql/dtos/order-by.args'
import { TransactionOrderByRelationAggregateInput } from 'src/models/transactions/graphql/dtos/order-by.args'

@InputType()
export class ProductItemOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      ProductItemOrderByWithRelationInputStrict,
      Prisma.ProductItemOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  timestamp: Prisma.SortOrder

  @Field(() => Prisma.SortOrder)
  productId: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  status: Prisma.SortOrder
  product: ProductOrderByWithRelationInput
  transactions: TransactionOrderByRelationAggregateInput
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class ProductItemOrderByWithRelationInput extends PartialType(
  ProductItemOrderByWithRelationInputStrict,
) {}

@InputType()
export class ProductItemOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
