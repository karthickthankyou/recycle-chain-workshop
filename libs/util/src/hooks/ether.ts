import { useEffect, useState } from 'react'
import {
  RecycleChain,
  RecycleChain__factory,
} from '../generated/typechain-types'
import { ethers } from 'ethers'
import { contractAddress } from '../contract'

declare global {
  interface Window {
    ethereum: any
  }
}

export const useAccount = () => {
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [isOwner, setIsOwner] = useState(false)
  const [contract, setContract] = useState<RecycleChain | null>(null)

  const initializeWeb3Provider = async () => {
    if (!window?.ethereum) {
      alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
      return
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x13882',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18,
            },
            blockExplorerUrls: ['https://amoy.polygonscan.com/'],
            rpcUrls: ['https://rpc-amoy.polygon.technology/'],
          },
        ],
      })
    } catch (error) {
      console.error('User denied account access or failed to add network')
    }
  }

  const fetchBlockchainData = async () => {
    if (!window?.ethereum) {
      console.error('Ethereum object not found')
      return
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)

      const signer = await provider.getSigner()
      const contract = RecycleChain__factory.connect(contractAddress, signer)
      setContract(contract)

      const accounts = await provider.send('eth_requestAccounts', [])
      if (accounts && accounts.length > 0) {
        const account = accounts[0]
        setAccount(account)

        const balance = await provider.getBalance(account)
        setBalance(ethers.formatEther(balance))

        const contractOwner = await contract.owner()
        setIsOwner(account.toLowerCase() === contractOwner.toLowerCase())
      } else {
        console.error('No accounts detected')
        return
      }
    } catch (error) {
      console.error(`Error getting blockchain information `, error)
    }
  }

  useEffect(() => {
    //   initializeWeb3Provider
    initializeWeb3Provider()
    //   Fetch blockchain information
    fetchBlockchainData()
  }, [account])

  return { account, balance, isOwner, contract }
}
