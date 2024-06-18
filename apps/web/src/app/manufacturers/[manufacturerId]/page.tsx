'use client'
import { AllProducts } from '@recycle-chain/ui/src/components/templates/AllProducts'

export default function Page({
  params,
}: {
  params: { manufacturerId: string }
}) {
  return <AllProducts manufacturerId={params.manufacturerId} />
}
