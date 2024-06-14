import { InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { ProductListRelationFilter } from 'src/models/products/graphql/dtos/where.args'

@InputType()
export class ManufacturerWhereUniqueInput {
  id: string
}

@InputType()
export class ManufacturerWhereInputStrict
  implements
    RestrictProperties<
      ManufacturerWhereInputStrict,
      Prisma.ManufacturerWhereInput
    >
{
  id: StringFilter
  timestamp: DateTimeFilter
  name: StringFilter
  location: StringFilter
  contact: StringFilter
  products: ProductListRelationFilter
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: ManufacturerWhereInput[]
  OR: ManufacturerWhereInput[]
  NOT: ManufacturerWhereInput[]
}

@InputType()
export class ManufacturerWhereInput extends PartialType(
  ManufacturerWhereInputStrict,
) {}

@InputType()
export class ManufacturerListRelationFilter {
  every?: ManufacturerWhereInput
  some?: ManufacturerWhereInput
  none?: ManufacturerWhereInput
}

@InputType()
export class ManufacturerRelationFilter {
  is?: ManufacturerWhereInput
  isNot?: ManufacturerWhereInput
}
