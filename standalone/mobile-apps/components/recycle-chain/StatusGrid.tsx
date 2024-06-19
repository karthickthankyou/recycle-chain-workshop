import { View, Text, StyleSheet } from 'react-native'

interface ProductCardProps {
  total: number
  sold: number
  returned: number
  recycled: number
}

export const StatusGrid: React.FC<ProductCardProps> = ({
  total,
  sold,
  returned,
  recycled,
}) => {
  const inventory = total - (sold + returned + recycled)

  return (
    <View style={styles.statusGrid}>
      <View style={styles.statusItem}>
        <Text style={styles.statusItemTitle}>Inventory</Text>
        <Text>{inventory}</Text>
      </View>
      <View style={styles.statusItem}>
        <Text style={styles.statusItemTitle}>Sold</Text>
        <Text>{sold}</Text>
      </View>
      <View style={styles.statusItem}>
        <Text style={styles.statusItemTitle}>Returned</Text>
        <Text>{returned}</Text>
      </View>
      <View style={styles.statusItem}>
        <Text style={styles.statusItemTitle}>Recycled</Text>
        <Text>{recycled}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  statusGrid: {
    flexDirection: 'row', // Set flexDirection to row for horizontal layout
    gap: 4,
    marginTop: 12,
    marginBottom: 16,
  },
  statusItem: {
    width: '24.25%',
    alignItems: 'center',
    padding: 6,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  statusItemTitle: {
    marginBottom: 4,
  },
})
