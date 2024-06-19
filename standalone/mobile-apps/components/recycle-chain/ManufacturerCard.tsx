import { ManufacturersQuery } from '@/gql/generated'
import { View, Text, StyleSheet } from 'react-native'

interface ManufacturerCardProps {
  manufacturer: ManufacturersQuery['manufacturers'][0]
}

export const ManufacturerCard: React.FC<ManufacturerCardProps> = ({
  manufacturer,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{manufacturer.name}</Text>
      <Text style={styles.description}>{manufacturer.location}</Text>
      <Text style={styles.description}>{manufacturer.contact}</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  card: {
    padding: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    marginBottom: 4,
    color: '#444',
  },
})
