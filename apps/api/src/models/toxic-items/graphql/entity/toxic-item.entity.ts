import { ObjectType } from '@nestjs/graphql'
import { ToxicItem as ToxicItemType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class ToxicItem implements RestrictProperties<ToxicItem, ToxicItemType> {
  timestamp: Date
  id: number
  name: string
  weight: number
  productId: string
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
