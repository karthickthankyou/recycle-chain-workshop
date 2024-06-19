'use client'
import { useQuery } from '@apollo/client'
import {
  ProductsDocument,
  QueryMode,
  SortOrder,
} from '@recycle-chain/network/src/gql/generated'
import { PageTitle } from '@recycle-chain/ui/src/components/atoms/PageTitle'
import { ProductCard } from '@recycle-chain/ui/src/components/organisms/ProductCard'
import { useAccount } from '@recycle-chain/util/src/hooks/ether'
import { useTakeSkip } from '@recycle-chain/util/src/hooks/pagination'
import { useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { ShowData } from '@recycle-chain/ui/src/components/organisms/ShowData'
import { AddProductDialog } from '../organisms/AddProductDialog'

export const AllProducts = ({
  manufacturerId,
}: {
  manufacturerId?: string
}) => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const [searchTerm, setSearchTerm] = useState('')
  const { loading, data } = useQuery(ProductsDocument, {
    variables: {
      skip,
      take,
      where: {
        ...(manufacturerId
          ? { manufacturerId: { equals: manufacturerId } }
          : null),
        ...(searchTerm
          ? { name: { contains: searchTerm, mode: QueryMode.Insensitive } }
          : null),
      },
      orderBy: { timestamp: SortOrder.Desc },
    },
  })

  const { account } = useAccount()
  const showCreateProductDialog =
    account.toLowerCase() === manufacturerId?.toLowerCase()

  return (
    <div>
      <div className="flex justify-between items-baseline gap-2 w-full">
        <PageTitle>All products</PageTitle>
        {showCreateProductDialog ? <AddProductDialog /> : null}
      </div>
      <div className=" mb-3">
        <div className="flex max-w-sm items-center gap-2 shadow-xl bg-white px-4 rounded">
          <IconSearch />
          <input
            placeholder="Search product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow py-4 bg-transparent"
          />
        </div>
      </div>
      <ShowData
        loading={loading}
        pagination={{
          resultCount: data?.products?.length,
          totalCount: data?.productsCount,
          setSkip,
          setTake,
          skip,
          take,
        }}
        className="grid gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 "
      >
        {data?.products?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ShowData>
    </div>
  )
}
