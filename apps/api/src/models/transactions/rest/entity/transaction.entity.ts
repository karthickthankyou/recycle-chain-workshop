import { $Enums, Transaction } from '@prisma/client'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsDate, IsString, IsInt } from 'class-validator'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class TransactionEntity
  implements RestrictProperties<TransactionEntity, Transaction>
{
  id: number
  timestamp: Date
  productItemId: string
  status: $Enums.ProductStatus
}
