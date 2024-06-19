import { ProductsQuery } from '@/gql/generated'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './ManufacturerCard'
import { useRouter } from 'expo-router'
import { StatusGrid } from './StatusGrid'

interface ProductCardProps {
  product: ProductsQuery['products'][0]
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() => router.push(`/product?productId=${product.id}`)}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.description}>{product.manufacturer.name}</Text>
        <Text style={styles.description}>{product.totalCount} items</Text>
      </View>
    </TouchableOpacity>
  )
}
