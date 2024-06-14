import { InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ProductRelationFilter } from 'src/models/products/graphql/dtos/where.args'

@InputType()
export class ToxicItemWhereUniqueInput {
  id: number
}

@InputType()
export class ToxicItemWhereInputStrict
  implements
    RestrictProperties<ToxicItemWhereInputStrict, Prisma.ToxicItemWhereInput>
{
  timestamp: DateTimeFilter
  id: IntFilter
  name: StringFilter
  weight: IntFilter
  productId: StringFilter
  Product: ProductRelationFilter

  AND: ToxicItemWhereInput[]
  OR: ToxicItemWhereInput[]
  NOT: ToxicItemWhereInput[]
}

@InputType()
export class ToxicItemWhereInput extends PartialType(
  ToxicItemWhereInputStrict,
) {}

@InputType()
export class ToxicItemListRelationFilter {
  every?: ToxicItemWhereInput
  some?: ToxicItemWhereInput
  none?: ToxicItemWhereInput
}

@InputType()
export class ToxicItemRelationFilter {
  is?: ToxicItemWhereInput
  isNot?: ToxicItemWhereInput
}
