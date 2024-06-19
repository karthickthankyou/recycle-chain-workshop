import { ProductsQuery } from '@/gql/generated'
import { View, Text } from 'react-native'
import { styles } from './ManufacturerCard'

interface ProductCardProps {
  product: ProductsQuery['products'][0]
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.manufacturer.name}</Text>
      <Text style={styles.description}>{product.totalCount} items</Text>
    </View>
  )
}
