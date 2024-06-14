import { Controller, Get, Param, Query } from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { ManufacturerQueryDto } from './dtos/query.dto'
import { ApiOkResponse } from '@nestjs/swagger'
import { ManufacturerEntity } from './entity/manufacturer.entity'

@ApiTags('manufacturers')
@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOkResponse({ type: [ManufacturerEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: ManufacturerQueryDto) {
    return this.prisma.manufacturer.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: ManufacturerEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prisma.manufacturer.findUnique({ where: { id } })
  }
}
