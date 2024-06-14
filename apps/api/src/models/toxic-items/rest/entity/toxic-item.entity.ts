import { ToxicItem } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class ToxicItemEntity
  implements RestrictProperties<ToxicItemEntity, ToxicItem>
{
  timestamp: Date
  id: number
  name: string
  weight: number
  productId: string
}
