'use client'
import { useAccount } from '@/hooks/ether'
import { useQuery } from '@apollo/client'
import { ProductsDocument } from '@recycle-chain/network/src/gql/generated'
import { HtmlInput } from '@recycle-chain/ui/src/components/atoms/HtmlInput'
import { HtmlLabel } from '@recycle-chain/ui/src/components/atoms/HtmlLabel'

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

      <input placeholder="Type something..." />
      <HtmlLabel
        title="Something"
        optional
        className="mt-8"
        error="Something is not right!"
      >
        <HtmlInput placeholder="Type something..." type="number" />
      </HtmlLabel>
      <div className="w-8 h-8 bg-primary rounded"></div>
    </main>
  )
}
