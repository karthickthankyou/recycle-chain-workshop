import { View, StyleSheet } from 'react-native'

interface ProgressBarProps {
  widthPercentage: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  widthPercentage,
}) => {
  console.log('widthPercentage', widthPercentage)
  return (
    <View style={styles.container}>
      <View style={styles.backgroundBar} />
      <View style={[styles.progressBar, { width: `${widthPercentage}%` }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 4,
    width: '100%',
  },
  backgroundBar: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#d3d3d3', // Light gray background
    borderRadius: 4,
  },
  progressBar: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#222', // Darker line on top
    borderRadius: 4,
  },
})
