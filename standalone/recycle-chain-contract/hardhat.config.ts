import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
require('dotenv').config()

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  defaultNetwork: 'amoy',
  networks: {
    amoy: {
      url: `https://polygon-amoy.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [process.env.PRIVATE_KEY || ''],
    },
  },
}

export default config
