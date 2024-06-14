import { Injectable } from '@nestjs/common'
import { FindManyProductArgs, FindUniqueProductArgs } from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyProductArgs) {
    return this.prisma.product.findMany(args)
  }

  findOne(args: FindUniqueProductArgs) {
    return this.prisma.product.findUnique(args)
  }
}
