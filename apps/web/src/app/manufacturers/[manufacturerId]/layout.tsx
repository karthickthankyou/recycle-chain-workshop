'use client'
import { useQuery } from '@apollo/client'
import { ManufacturerDocument } from '@recycle-chain/network/src/gql/generated'

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
  return (
    <main>
      <pre>{JSON.stringify(data, null, 2)}</pre> {children}
    </main>
  )
}
