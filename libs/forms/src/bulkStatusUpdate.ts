import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ProductStatus } from '@recycle-chain/network/src/gql/generated'

export const schemaBulkStatusUpdate = z.object({
  ids: z.string().min(1),
  status: z.nativeEnum(ProductStatus),
})

export type FormTypeBulkStatusUpdate = z.infer<typeof schemaBulkStatusUpdate>

export const useFormBulkStatusUpdate = () =>
  useForm<FormTypeBulkStatusUpdate>({
    resolver: zodResolver(schemaBulkStatusUpdate),
  })
