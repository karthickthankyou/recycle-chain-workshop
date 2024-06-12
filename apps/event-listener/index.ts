import { ethers } from 'ethers'
import { contractAddress } from './util'
import { SimpleCounter__factory } from '../../standalone/simple-counter/typechain-types'
require('dotenv').config()

const main = () => {
  const infuraWssUrl = `wss://polygon-amoy.infura.io/ws/v3/${process.env.INFURA_KEY}`

  const provider = new ethers.WebSocketProvider(infuraWssUrl)

  const contract = SimpleCounter__factory.connect(contractAddress, provider)

  try {
    contract.on(contract.filters['NumberIncremented'], (updatedNumber) => {
      console.log(`🎉 Number incremented: `, updatedNumber)
    })

    console.log('Event: NumberIncremented Listening...')
  } catch (error) {
    console.error('Event: NumberIncremented: Listener setup failed.', error)
  }

  try {
    contract.on(contract.filters['NumberDecremented'], (updatedNumber) => {
      console.log(`🎉 Number decremented: `, updatedNumber)
    })

    console.log('Event: NumberDecremented Listening...')
  } catch (error) {
    console.error('Event: NumberDecremented: Listener setup failed.', error)
  }
}

main()
