import { StatusBar } from 'expo-status-bar'
import { Linking, Platform, StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { colors } from '@/constants/Colors'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

export default function ModalScreen() {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      title: 'About',
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recycle Chain</Text>
      <Text style={styles.description}>
        RecycleChain is an application designed to encourage manufacturers to
        track the toxic items their products contain and recycle them rather
        than dumping them on the environment. By providing a comprehensive
        tracking system, RecycleChain helps promote sustainability and
        environmental responsibility.
      </Text>
      <Text style={styles.description}>
        Learn more about the project and contribute to its development by
        visiting the GitHub repository:
      </Text>
      <Text
        style={styles.link}
        onPress={() =>
          Linking.openURL(
            'https://github.com/karthickthankyou/recyclechain-practice',
          )
        }
      >
        RecycleChain GitHub Repository
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: colors.primary['600'],
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
})
