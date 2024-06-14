import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { TransactionsService } from './transactions.service'
import { Transaction } from './entity/transaction.entity'
import {
  FindManyTransactionArgs,
  FindUniqueTransactionArgs,
} from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { ProductItem } from 'src/models/product-items/graphql/entity/product-item.entity'

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Transaction], { name: 'transactions' })
  findAll(@Args() args: FindManyTransactionArgs) {
    return this.transactionsService.findAll(args)
  }

  @Query(() => Transaction, { name: 'transaction' })
  findOne(@Args() args: FindUniqueTransactionArgs) {
    return this.transactionsService.findOne(args)
  }

  @ResolveField(() => ProductItem)
  productItem(@Parent() transaction: Transaction) {
    return this.prisma.productItem.findUnique({
      where: { id: transaction.productItemId },
    })
  }
}
