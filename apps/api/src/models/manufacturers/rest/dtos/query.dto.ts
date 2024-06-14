import { IsIn, IsOptional } from 'class-validator'
import { Prisma } from '@prisma/client'
import { BaseQueryDto } from 'src/common/dtos/common.dto'

export class ManufacturerQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.ManufacturerScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.ManufacturerScalarFieldEnum))
  searchBy?: string
}
