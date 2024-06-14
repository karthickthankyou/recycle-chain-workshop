import { Controller, Get, Param, Query } from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { ProductQueryDto } from './dtos/query.dto'
import { ApiOkResponse } from '@nestjs/swagger'
import { ProductEntity } from './entity/product.entity'

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly prisma: PrismaService) {}

  @ApiOkResponse({ type: [ProductEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: ProductQueryDto) {
    return this.prisma.product.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: ProductEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prisma.product.findUnique({ where: { id } })
  }
}
