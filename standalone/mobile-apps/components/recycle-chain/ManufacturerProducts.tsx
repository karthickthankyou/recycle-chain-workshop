import { ProductsDocument, ProductsQuery } from '@/gql/generated'
import { useQuery } from '@apollo/client'
import { FlatList, View } from 'react-native'
import { ProductCard } from './ProductCard'

export const ManufacturerProducts = ({
  manufacturerId,
}: {
  manufacturerId: string
}) => {
  const { data, loading, fetchMore } = useQuery(ProductsDocument, {
    variables: { where: { manufacturerId: { equals: manufacturerId } } },
  })

  const loadMore = async () => {
    await fetchMore({
      variables: {
        skip: data?.products?.length,
        take: 8,
        where: { manufacturerId: { equals: manufacturerId } },
      },
    })
  }

  return (
    <View>
      <FlatList<ProductsQuery['products'][0]>
        data={data?.products || []}
        renderItem={({ item }) => <ProductCard product={item} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  )
}
