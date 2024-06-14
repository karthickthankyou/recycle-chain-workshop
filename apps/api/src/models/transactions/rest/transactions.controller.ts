import { Controller, Get, Param, Query } from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { TransactionQueryDto } from './dtos/query.dto'
import { ApiOkResponse } from '@nestjs/swagger'
import { TransactionEntity } from './entity/transaction.entity'

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOkResponse({ type: [TransactionEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: TransactionQueryDto) {
    return this.prisma.transaction.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: TransactionEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.transaction.findUnique({ where: { id } })
  }
}
