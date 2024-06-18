'use client'
import { useQuery } from '@apollo/client'
import { ManufacturerDocument } from '@recycle-chain/network/src/gql/generated'
import { AlertSection } from '@recycle-chain/ui/src/components/molecules/AlertSection'
import { ManufacturerRegisterButton } from '@recycle-chain/ui/src/components/molecules/ManufacturerRegisterButton'
import { NoItemsFound } from '@recycle-chain/ui/src/components/molecules/NoItemsFound'
import { StyledLink } from '@recycle-chain/ui/src/components/molecules/StyledLink'
import { ManufacturerTopCard } from '@recycle-chain/ui/src/components/organisms/ManufacturerTopCard'
import Link from 'next/link'
export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { manufacturerId: string }
}) {
  const { data } = useQuery(ManufacturerDocument, {
    variables: { where: { id: params.manufacturerId } },
  })

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
    </main>
  )
}
