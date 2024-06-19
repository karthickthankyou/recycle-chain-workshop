export const colors = {
  primary: {
    50: 'hsl(137, 88%, 97%)',
    100: 'hsl(137, 85%, 93%)',
    200: 'hsl(137, 86%, 85%)',
    300: 'hsl(137, 85%, 73%)',
    400: 'hsl(137, 78%, 61%)',
    500: 'hsl(137, 71%, 45%)',
    600: 'hsl(137, 76%, 36%)',
    700: 'hsl(137, 72%, 29%)',
    800: 'hsl(137, 78%, 27%)',
    900: 'hsl(137, 70%, 24%)',
    950: 'hsl(137, 81%, 10%)',
  },
  // Add more color categories if needed
}

const tintColorLight = colors.primary['500']
const tintColorDark = '#fff'

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
}
