import { ProductItemsDocument, ProductItemsQuery } from '@/gql/generated'
import { useQuery } from '@apollo/client'
import { FlatList, Text } from 'react-native'
import { ProductItemCard } from './ProductItemCard'

export const ProductItemsList = ({
  productId,
  searchQuery,
}: {
  productId: string
  searchQuery?: string
}) => {
  const {
    data: productItemsData,
    loading,
    fetchMore,
  } = useQuery(ProductItemsDocument, {
    variables: {
      where: {
        productId: { equals: productId },
        ...(searchQuery ? { id: { contains: searchQuery } } : null),
      },
      skip: 0,
      take: 8,
    },
  })

  const loadMoreItems = async () => {
    await fetchMore({
      variables: {
        skip: productItemsData?.productItems?.length,
        take: 8,
      },
    })
  }

  if (loading) {
    return <Text>Loading...</Text>
  }
  if (!productItemsData?.productItems.length) {
    return <Text>No items found.</Text>
  }

  return (
    <FlatList<ProductItemsQuery['productItems'][0]>
      data={productItemsData?.productItems}
      renderItem={({ item }) => <ProductItemCard item={item} />}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMoreItems}
      onEndReachedThreshold={0.5}
    />
  )
}
