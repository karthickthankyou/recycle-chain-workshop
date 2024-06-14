import { Injectable } from '@nestjs/common'
import {
  FindManyTransactionArgs,
  FindUniqueTransactionArgs,
} from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: FindManyTransactionArgs) {
    return this.prisma.transaction.findMany(args)
  }

  findOne(args: FindUniqueTransactionArgs) {
    return this.prisma.transaction.findUnique(args)
  }
}
