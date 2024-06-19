import {
  ProductStatus,
  TransactionsDocument,
  TransactionsQuery,
} from '@/gql/generated'
import { useQuery } from '@apollo/client'
import { FontAwesome } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect } from 'react'
import { Icon } from './(tabs)/_layout'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { colors } from '@/constants/Colors'
import { format } from 'date-fns'

type RootStackParamList = {
  product: { productItemId: string }
}

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'product'>

const statusIconMap: Record<
  ProductStatus,
  React.ComponentProps<typeof FontAwesome>['name']
> = {
  [ProductStatus.Manufactured]: 'industry',
  [ProductStatus.Recycled]: 'recycle',
  [ProductStatus.Returned]: 'undo',
  [ProductStatus.Sold]: 'shopping-cart',
}

const ProductItemTimelineScreen = () => {
  const route = useRoute<ProductScreenRouteProp>()
  const { productItemId } = route.params

  const { data, loading, fetchMore } = useQuery(TransactionsDocument, {
    variables: {
      where: { productItemId: { equals: productItemId } },
      skip: 0,
      take: 8,
    },
  })

  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      title: `${productItemId} timeline`,
    })
  }, [navigation, productItemId])

  const loadMoreItems = async () => {
    await fetchMore({
      variables: {
        skip: data?.transactions?.length,
        take: 8,
      },
    })
  }

  if (loading) {
    return <Icon name="dot-circle-o" color="#000" />
  }

  return (
    <FlatList<TransactionsQuery['transactions'][0]>
      data={data?.transactions || []}
      renderItem={({ item, index }) => {
        const isActive = index === (data?.transactions?.length || 0) - 1

        return (
          <View style={[styles.productItem, isActive && styles.activeItem]}>
            <Icon
              name={statusIconMap[item.status]}
              color={isActive ? colors.primary['600'] : 'grey'}
            />
            <View style={styles.textContainer}>
              <Text style={styles.date}>
                {format(new Date(item.timestamp), 'PPp')}
              </Text>
              <Text>{item.status}</Text>
            </View>
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  textContainer: {
    marginLeft: 16,
  },
  date: {
    fontWeight: 'semibold',
    marginBottom: 4,
    fontSize: 18,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  activeItem: {
    backgroundColor: colors.primary['100'],
  },
})

export default ProductItemTimelineScreen
