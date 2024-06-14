import { Controller, Get, Param, Query } from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { ToxicItemQueryDto } from './dtos/query.dto'
import { ApiOkResponse } from '@nestjs/swagger'
import { ToxicItemEntity } from './entity/toxic-item.entity'

@ApiTags('toxic-items')
@Controller('toxic-items')
export class ToxicItemsController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOkResponse({ type: [ToxicItemEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: ToxicItemQueryDto) {
    return this.prisma.toxicItem.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: ToxicItemEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.toxicItem.findUnique({ where: { id } })
  }
}
