'use client'
import { useQuery } from '@apollo/client'
import { ProductDocument } from '@recycle-chain/network/src/gql/generated'
import { AlertSection } from '@recycle-chain/ui/src/components/molecules/AlertSection'
import { LoaderPanel } from '@recycle-chain/ui/src/components/molecules/Loader'
import { ProductTopCard } from '@recycle-chain/ui/src/components/organisms/ProductTopCard'

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { productId: string }
}) {
  const { loading, data } = useQuery(ProductDocument, {
    variables: { where: { id: params.productId } },
  })

  if (loading) {
    return <LoaderPanel />
  }

  if (!data?.product) {
    return <AlertSection>Product not found.</AlertSection>
  }

  return (
    <main className="mt-6 ">
      <ProductTopCard product={data.product} />
      {children}
    </main>
  )
}
