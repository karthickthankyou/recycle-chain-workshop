'use client'
import { useQuery } from '@apollo/client'
import { ManufacturersDocument } from '@recycle-chain/network/src/gql/generated'

export default function Page() {
  const { data } = useQuery(ManufacturersDocument)
  return <pre>Manufacuters {JSON.stringify(data, null, 2)}</pre>
}
