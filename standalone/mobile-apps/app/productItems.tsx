import { ProductItemsList } from '@/components/recycle-chain/ProductItemsList'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'

type RootStackParamList = {
  product: { productId: string }
}
type ProductScreenRouteProp = RouteProp<RootStackParamList, 'product'>

const ProductItemsScreen = () => {
  const route = useRoute<ProductScreenRouteProp>()
  const { productId } = route.params

  const [searchQuery, setSearchQuery] = useState('')

  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      title: 'Items',
    })
  }, [navigation, productId])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search by ID"
        value={searchQuery}
        onChangeText={setSearchQuery}
        keyboardAppearance="default"
      />
      <ProductItemsList productId={productId} searchQuery={searchQuery} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    padding: 8,
    borderColor: '#ddd',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
  },
})

export default ProductItemsScreen
