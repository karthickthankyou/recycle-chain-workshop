import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const schemaAddProductItems = z.object({
  quantity: z.number().min(1).max(10),
})

export type FormTypeAddProductItems = z.infer<typeof schemaAddProductItems>

export const useFormAddProductItems = () =>
  useForm<FormTypeAddProductItems>({
    resolver: zodResolver(schemaAddProductItems),
  })
