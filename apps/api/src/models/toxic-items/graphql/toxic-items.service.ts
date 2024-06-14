import { Injectable } from '@nestjs/common'
import {
  FindManyToxicItemArgs,
  FindUniqueToxicItemArgs,
} from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class ToxicItemsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyToxicItemArgs) {
    return this.prisma.toxicItem.findMany(args)
  }

  findOne(args: FindUniqueToxicItemArgs) {
    return this.prisma.toxicItem.findUnique(args)
  }
}
