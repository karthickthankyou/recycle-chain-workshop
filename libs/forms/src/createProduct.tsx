import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import React, { ReactNode } from 'react'

export const schemaCreateProduct = z.object({
  name: z.string().min(1),
  toxicItems: z.array(
    z.object({ name: z.string().min(1), weight: z.number().min(1) }),
  ),
})

export type FormTypeCreateProduct = z.infer<typeof schemaCreateProduct>

export const useFormCreateProduct = () =>
  useForm<FormTypeCreateProduct>({
    resolver: zodResolver(schemaCreateProduct),
  })

export const FormProviderCreateProduct = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormCreateProduct()
  return <FormProvider {...methods}>{children}</FormProvider>
}
