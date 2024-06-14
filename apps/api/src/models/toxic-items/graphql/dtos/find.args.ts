import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ToxicItemOrderByWithRelationInput } from './order-by.args'
import { ToxicItemWhereInput, ToxicItemWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.ToxicItemScalarFieldEnum, {
  name: 'ToxicItemScalarFieldEnum',
})

@ArgsType()
class FindManyToxicItemArgsStrict
  implements
    RestrictProperties<
      FindManyToxicItemArgsStrict,
      Omit<Prisma.ToxicItemFindManyArgs, 'include' | 'select'>
    >
{
  where: ToxicItemWhereInput
  orderBy: ToxicItemOrderByWithRelationInput[]
  cursor: ToxicItemWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.ToxicItemScalarFieldEnum])
  distinct: Prisma.ToxicItemScalarFieldEnum[]
}

@ArgsType()
export class FindManyToxicItemArgs extends PartialType(
  FindManyToxicItemArgsStrict,
) {}

@ArgsType()
export class FindUniqueToxicItemArgs {
  where: ToxicItemWhereUniqueInput
}
