import { IsIn, IsOptional } from 'class-validator'
import { Prisma } from '@prisma/client'
import { BaseQueryDto } from 'src/common/dtos/common.dto'

export class ToxicItemQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.ToxicItemScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.ToxicItemScalarFieldEnum))
  searchBy?: string
}
