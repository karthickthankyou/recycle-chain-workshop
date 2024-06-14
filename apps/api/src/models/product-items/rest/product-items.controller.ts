import { Controller, Get, Param, Query } from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { ProductItemQueryDto } from './dtos/query.dto'
import { ApiOkResponse } from '@nestjs/swagger'
import { ProductItemEntity } from './entity/product-item.entity'

@ApiTags('product-items')
@Controller('product-items')
export class ProductItemsController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOkResponse({ type: [ProductItemEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: ProductItemQueryDto) {
    return this.prisma.productItem.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: ProductItemEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prisma.productItem.findUnique({ where: { id } })
  }
}
