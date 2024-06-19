import { ProductsQuery } from '@/gql/generated'
import { View, Text, StyleSheet } from 'react-native'
import { ProgressBar } from './ProgressBar'

export const ToxicItemsChart = ({
  toxicItems,
}: {
  toxicItems: ProductsQuery['products'][0]['toxicItems']
}) => {
  const totalWeight = toxicItems.reduce((sum, item) => sum + item.weight, 0)

  return (
    <View style={styles.container}>
      {toxicItems.map((item) => {
        const widthPercentage = (item.weight / totalWeight) * 100
        return (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.itemInfo}>
              <Text>{item.name}</Text>
              <Text style={styles.itemWeight}>{item.weight}mg</Text>
            </View>
            <ProgressBar widthPercentage={widthPercentage} />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
  },
  itemWeight: {
    fontSize: 12,
    color: 'gray',
  },
})
