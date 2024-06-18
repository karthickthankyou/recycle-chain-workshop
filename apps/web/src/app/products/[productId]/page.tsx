'use client'
import { ShowProductItems } from '@recycle-chain/ui/src/components/templates/ShowProductItems'

export default function Page({ params }: { params: { productId: string } }) {
  return <ShowProductItems productId={params.productId} />
}
