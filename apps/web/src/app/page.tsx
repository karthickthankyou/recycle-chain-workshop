'use client'
import { useAccount } from '@/hooks/ether'
import { useQuery } from '@apollo/client'
import { ProductsDocument } from '@recycle-chain/network/src/gql/generated'

export default function Home() {
  const { account, balance, contract, isOwner } = useAccount()
  const { data, loading } = useQuery(ProductsDocument)
  return (
    <main>
      <div>Account {account}</div>
      <div>balance {balance}</div>
      <div>isOwner {String(isOwner)}</div>

      <div className="mt-12">
        {data?.products.map((product) => (
          <div key={product.id}>
            <div>{product.id}</div>
            <div>{product.name}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
