import { InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ManufacturerRelationFilter } from 'src/models/manufacturers/graphql/dtos/where.args'
import { ProductItemListRelationFilter } from 'src/models/product-items/graphql/dtos/where.args'
import { ToxicItemListRelationFilter } from 'src/models/toxic-items/graphql/dtos/where.args'

@InputType()
export class ProductWhereUniqueInput {
  id: string
}

@InputType()
export class ProductWhereInputStrict
  implements
    RestrictProperties<ProductWhereInputStrict, Prisma.ProductWhereInput>
{
  id: StringFilter
  timestamp: DateTimeFilter
  name: StringFilter
  manufacturerId: StringFilter
  manufacturer: ManufacturerRelationFilter
  productItems: ProductItemListRelationFilter
  toxicItems: ToxicItemListRelationFilter
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: ProductWhereInput[]
  OR: ProductWhereInput[]
  NOT: ProductWhereInput[]
}

@InputType()
export class ProductWhereInput extends PartialType(ProductWhereInputStrict) {}

@InputType()
export class ProductListRelationFilter {
  every?: ProductWhereInput
  some?: ProductWhereInput
  none?: ProductWhereInput
}

@InputType()
export class ProductRelationFilter {
  is?: ProductWhereInput
  isNot?: ProductWhereInput
}
