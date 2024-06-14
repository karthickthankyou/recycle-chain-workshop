'use client'
import { useAccount } from '@/hooks/ether'

export default function Home() {
  const { account, balance, contract, isOwner } = useAccount()
  return (
    <main>
      <div>Account {account}</div>
      <div>balance {balance}</div>
      <div>isOwner {String(isOwner)}</div>
    </main>
  )
}
