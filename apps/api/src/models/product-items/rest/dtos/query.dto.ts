import { IsIn, IsOptional } from 'class-validator'
import { Prisma } from '@prisma/client'
import { BaseQueryDto } from 'src/common/dtos/common.dto'

export class ProductItemQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.ProductItemScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.ProductItemScalarFieldEnum))
  searchBy?: string
}
