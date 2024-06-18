import { useAccount } from './ether'
import { useQuery } from '@apollo/client'
import { ManufacturerDocument } from '@recycle-chain/network/src/gql/generated'

export const useGetManufacturer = ({
  manufacturerId,
}: {
  manufacturerId: string
}) => {
  const { account } = useAccount()
  const { loading, data } = useQuery(ManufacturerDocument, {
    variables: { where: { id: manufacturerId } },
  })

  const isOwner = account.toLowerCase() === data?.manufacturer.id.toLowerCase()

  return { manufacturer: data?.manufacturer, isOwner }
}
