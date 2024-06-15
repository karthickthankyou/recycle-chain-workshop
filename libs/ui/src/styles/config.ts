import colors from 'tailwindcss/colors'

const grayPallete = {
  DEFAULT: `hsl(10, 2%, 32%)`,
  25: `hsl(10, 2%, 94%)`,
  50: `hsl(10, 2%, 90%)`,
  100: `hsl(10, 2%, 80%)`,
  200: `hsl(10, 2%, 70%)`,
  300: `hsl(10, 2%, 60%)`,
  400: `hsl(10, 2%, 50%)`,
  500: `hsl(10, 2%, 32%)`,
  600: `hsl(10, 2%, 24%)`,
  700: `hsl(10, 2%, 16%)`,
  800: `hsl(10, 2%, 08%)`,
  900: `hsl(10, 2%, 04%)`,
}

const redPallete = {
  DEFAULT: 'hsl(10, 94%, 45%)',
  25: 'hsl(10, 94%, 98%)',
  50: 'hsl(10, 94%, 92%)',
  100: 'hsl(10, 94%, 84%)',
  200: 'hsl(10, 94%, 74%)',
  300: 'hsl(10, 94%, 64%)',
  400: 'hsl(10, 94%, 54%)',
  500: 'hsl(10, 94%, 45%)',
  600: 'hsl(10, 94%, 35%)',
  700: 'hsl(10, 94%, 22%)',
  800: 'hsl(10, 94%, 10%)',
  900: 'hsl(10, 94%, 04%)',
}

const yellowPallete = {
  DEFAULT: 'hsl(52, 100%, 50%)',
  25: 'hsl(51, 97%, 98%)',
  50: 'hsl(51, 97%, 92%)',
  100: 'hsl(51, 97%, 84%)',
  200: 'hsl(51, 97%, 75%)',
  300: 'hsl(51, 97%, 66%)',
  400: 'hsl(51, 97%, 58%)',
  500: 'hsl(51, 97%, 50%)',
  600: 'hsl(51, 97%, 38%)',
  700: 'hsl(51, 97%, 24%)',
  800: 'hsl(51, 97%, 10%)',
  900: 'hsl(51, 97%, 04%)',
}

export const colorsConfig = {
  transparent: colors.transparent,
  primary: colors.black,
  black: colors.black,
  white: colors.white,
  green: colors.green,
  red: redPallete,
  yellow: yellowPallete,
  gray: grayPallete,
  accent: colors.black,
}
