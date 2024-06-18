'use client'
import { useQuery } from '@apollo/client'
import { ManufacturerDocument } from '@recycle-chain/network/src/gql/generated'
import { AlertSection } from '@recycle-chain/ui/src/components/molecules/AlertSection'
import { LoaderPanel } from '@recycle-chain/ui/src/components/molecules/Loader'
import { ManufacturerRegisterButton } from '@recycle-chain/ui/src/components/molecules/ManufacturerRegisterButton'
import { ManufacturerTopCard } from '@recycle-chain/ui/src/components/organisms/ManufacturerTopCard'
export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { manufacturerId: string }
}) {
  const { data, loading } = useQuery(ManufacturerDocument, {
    variables: { where: { id: params.manufacturerId } },
  })

  if (loading) {
    return <LoaderPanel />
  }

  console.log('layout ', data)

  if (!data?.manufacturer) {
    return (
      <AlertSection>
        <div className="text-xl">Manufacturer not found.</div>
        <ManufacturerRegisterButton />
      </AlertSection>
    )
  }
  return (
    <main>
      <ManufacturerTopCard manufacturer={data?.manufacturer} className="mb-4" />
      {children}
    </main>
  )
}
