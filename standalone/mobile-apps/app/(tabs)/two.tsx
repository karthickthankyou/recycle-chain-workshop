import { StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { View } from '@/components/Themed'
import { ManufacturersDocument, ManufacturersQuery } from '@/gql/generated'
import { useQuery } from '@apollo/client'
import { FlatList } from 'react-native'
import { ManufacturerCard } from '@/components/recycle-chain/ManufacturerCard'

export default function TabTwoScreen() {
  const { data, loading, fetchMore } = useQuery(ManufacturersDocument)

  const loadMore = async () => {
    await fetchMore({
      variables: {
        skip: data?.manufacturers?.length,
        take: 8,
      },
    })
  }

  return (
    <View>
      <FlatList<ManufacturersQuery['manufacturers'][0]>
        data={data?.manufacturers}
        renderItem={({ item }) => <ManufacturerCard manufacturer={item} />}
        onEndReached={loadMore}
      />
    </View>
  )
}
