import { useQuery } from '@apollo/client'
import { ProductItemsDocument } from '@recycle-chain/network/src/gql/generated'
import { useTakeSkip } from '@recycle-chain/util/src/hooks/pagination'
import { useState } from 'react'
import { PageTitle } from '../atoms/PageTitle'
import { IconSearch } from '@tabler/icons-react'
import { ShowData } from '../organisms/ShowData'
import { ProductItemCard } from '../organisms/ProductItemCard'

export const ShowProductItems = ({ productId }: { productId: string }) => {
  const { setSkip, setTake, skip, take } = useTakeSkip(0, 12)
  const [searchTerm, setSearchTerm] = useState('')

  const { loading, data } = useQuery(ProductItemsDocument, {
    variables: {
      skip,
      take,
      where: {
        productId: { equals: productId },
        ...(searchTerm ? { id: { contains: searchTerm } } : null),
      },
    },
  })

  return (
    <div>
      <PageTitle>Product Items</PageTitle>
      <div className="flex items-baseline justify-between mb-4">
        <div className="flex items-center gap-2 max-w-sm shadow-xl bg-white px-4 rounded">
          <IconSearch />
          <input
            placeholder="Search item id"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow py-4 bg-transparent"
          />
        </div>
        <div>
          {/* Todo: if the viewer is the owner, add and modify items */}
        </div>
      </div>
      <ShowData
        loading={loading}
        pagination={{
          resultCount: data?.productItems?.length,
          totalCount: data?.productItemsCount,
          setSkip,
          setTake,
          skip,
          take,
        }}
      >
        {data?.productItems?.map((item) => (
          <ProductItemCard key={item.id} productItem={item} />
        ))}
      </ShowData>
    </div>
  )
}
