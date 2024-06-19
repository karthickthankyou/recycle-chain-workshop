import { ProductItemsQuery } from '@/gql/generated'
import { useRouter } from 'expo-router'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'

type ProductItemCardProps = {
  item: ProductItemsQuery['productItems'][0]
}

export const ProductItemCard: React.FC<ProductItemCardProps> = ({ item }) => {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() =>
        router.push(`/productItemTimeline?productItemId=${item.id}`)
      }
    >
      <View style={styles.card}>
        <Text style={styles.itemId}>{item.id}</Text>
        <Text>{item.status}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemId: {
    fontSize: 24,
  },
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
})
