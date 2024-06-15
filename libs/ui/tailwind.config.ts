import type { Config } from 'tailwindcss'
import { colorsConfig } from './src/styles/config'

const config: Config = {
  important: true,
  content: ['./src/components/**/*.{js,ts,jsx,tsx}'],

  theme: {
    colors: colorsConfig,
    extend: {
      borderRadius: {
        DEFAULT: '12px',
      },
    },
  },
}
export default config
