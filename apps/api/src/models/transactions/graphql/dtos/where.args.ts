import { Field, InputType, PartialType } from '@nestjs/graphql'
import { $Enums, Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ProductItemRelationFilter } from 'src/models/product-items/graphql/dtos/where.args'

@InputType()
export class TransactionWhereUniqueInput {
  id: number
}

@InputType()
export class TransactionWhereInputStrict
  implements
    RestrictProperties<
      TransactionWhereInputStrict,
      Prisma.TransactionWhereInput
    >
{
  id: IntFilter
  timestamp: DateTimeFilter
  productItemId: StringFilter
  @Field(() => $Enums.ProductStatus)
  status: $Enums.ProductStatus
  productItem: ProductItemRelationFilter
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: TransactionWhereInput[]
  OR: TransactionWhereInput[]
  NOT: TransactionWhereInput[]
}

@InputType()
export class TransactionWhereInput extends PartialType(
  TransactionWhereInputStrict,
) {}

@InputType()
export class TransactionListRelationFilter {
  every?: TransactionWhereInput
  some?: TransactionWhereInput
  none?: TransactionWhereInput
}

@InputType()
export class TransactionRelationFilter {
  is?: TransactionWhereInput
  isNot?: TransactionWhereInput
}
