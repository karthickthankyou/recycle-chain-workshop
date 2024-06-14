import { Field, InputType, PartialType } from '@nestjs/graphql'
import { $Enums, Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ProductRelationFilter } from 'src/models/products/graphql/dtos/where.args'
import { TransactionListRelationFilter } from 'src/models/transactions/graphql/dtos/where.args'

@InputType()
export class ProductItemWhereUniqueInput {
  id: string
}

@InputType()
export class ProductItemWhereInputStrict
  implements
    RestrictProperties<
      ProductItemWhereInputStrict,
      Prisma.ProductItemWhereInput
    >
{
  id: StringFilter
  timestamp: DateTimeFilter
  productId: StringFilter
  @Field(() => $Enums.ProductStatus)
  status: $Enums.ProductStatus
  product: ProductRelationFilter
  transactions: TransactionListRelationFilter
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: ProductItemWhereInput[]
  OR: ProductItemWhereInput[]
  NOT: ProductItemWhereInput[]
}

@InputType()
export class ProductItemWhereInput extends PartialType(
  ProductItemWhereInputStrict,
) {}

@InputType()
export class ProductItemListRelationFilter {
  every?: ProductItemWhereInput
  some?: ProductItemWhereInput
  none?: ProductItemWhereInput
}

@InputType()
export class ProductItemRelationFilter {
  is?: ProductItemWhereInput
  isNot?: ProductItemWhereInput
}
