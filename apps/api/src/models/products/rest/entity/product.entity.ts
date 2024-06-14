import { Product } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class ProductEntity
  implements RestrictProperties<ProductEntity, Product>
{
  id: string
  timestamp: Date
  name: string
  manufacturerId: string
}
