import { DefaultTheme } from '@react-navigation/native'
import { colors } from './Colors'

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[600], // Use your primary color
    background: '#ffffff', // Customize other colors as needed
    card: '#ffffff',
    text: '#000000',
    border: '#cccccc',
  },
}
