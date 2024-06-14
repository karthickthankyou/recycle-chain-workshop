import { IsIn, IsOptional } from 'class-validator'
import { Prisma } from '@prisma/client'
import { BaseQueryDto } from 'src/common/dtos/common.dto'

export class TransactionQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.TransactionScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.TransactionScalarFieldEnum))
  searchBy?: string
}
