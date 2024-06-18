import { ProductsQuery } from '@recycle-chain/network/src/gql/generated'
import { ReactNode } from 'react'
import { DonutChartSimplified } from './DonutChartSimplified'
import { ToxicItemsChart } from './ToxicItemsChart'
import { StyledLink } from '../molecules/StyledLink'

export interface IProductCardProps {
  product: NonNullable<ProductsQuery['products']>[0]
  children?: ReactNode
}
export const ProductCard = ({ product, children }: IProductCardProps) => {
  return (
    <div className="p-4 shadow-lg overflow-hidden bg-white h-full rounded flex flex-col">
      <DonutChartSimplified
        total={product.totalCount}
        sold={product.soldCount}
        returned={product.returnedCount}
        recycled={product.recycledCount}
      />
      <div className="text-center mt-4">
        <h2 className="font-bold text-xl text-gray-800">{product.name}</h2>
      </div>
      <div className="text-center mt-1">
        <h2 className="font-medium text-gray-800">
          {product.manufacturer.name}
        </h2>
      </div>
      <div className="flex gap-1 justify-center text-sm mt-2 text-gray">
        <div>{product.totalCount} items</div>
      </div>
      <hr className="my-4" />
      <ToxicItemsChart toxicItems={product.toxicItems} />

      <div className="mt-auto">
        <div className="flex justify-end mt-4">
          <StyledLink href={`/products/${product.id}`} key={product.id}>
            View
          </StyledLink>
        </div>
      </div>
    </div>
  )
}
