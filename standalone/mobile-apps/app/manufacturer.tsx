import { ManufacturerProducts } from '@/components/recycle-chain/ManufacturerProducts'
import { StatusGrid } from '@/components/recycle-chain/StatusGrid'
import { ManufacturerDocument, ManufacturerQuery } from '@/gql/generated'
import { useQuery } from '@apollo/client'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

type RootStackParamList = {
  manufacturer: { manufacturerId: string }
}

type ManufacturerScreenRouteProp = RouteProp<RootStackParamList, 'manufacturer'>

const ManufacturerScreen: React.FC = () => {
  const route = useRoute<ManufacturerScreenRouteProp>()
  const { manufacturerId } = route.params

  const { data, loading, error } = useQuery<ManufacturerQuery>(
    ManufacturerDocument,
    {
      variables: { where: { id: manufacturerId } },
    },
  )

  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      title: data?.manufacturer.name || 'Manufacturer',
    })
  }, [navigation, data])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>
  if (!data?.manufacturer) {
    return <Text>Manufacturer not found.</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.title}>{data.manufacturer.name}</Text>
        <Text>{data.manufacturer.location}</Text>
        <Text>{data.manufacturer.contact}</Text>
        <StatusGrid
          total={data.manufacturer.totalCount || 0}
          sold={data.manufacturer.soldCount || 0}
          returned={data.manufacturer.returnedCount || 0}
          recycled={data.manufacturer.recycledCount || 0}
        />
        <ManufacturerProducts manufacturerId={manufacturerId} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  details: {
    padding: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
})

export default ManufacturerScreen
