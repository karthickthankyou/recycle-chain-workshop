import { ProductsQuery } from '@recycle-chain/network/src/gql/generated'
import { ReactNode } from 'react'
import { DonutChartSimplified } from './DonutChartSimplified'
import { ToxicItemsChart } from './ToxicItemsChart'
import { StyledLink } from '../molecules/StyledLink'

export interface IProductTopCard {
  product: NonNullable<ProductsQuery['products']>[0]
  children?: ReactNode
}
export const ProductTopCard = ({ product, children }: IProductTopCard) => {
  return (
    <div className=" flex flex-col md:flex-row items-center md:items-start md:space-x-6">
      <div className="w-full md:w-1/3">
        <DonutChartSimplified
          total={product.totalCount}
          sold={product.soldCount}
          returned={product.returnedCount}
          recycled={product.recycledCount}
        />
      </div>
      <div className="w-full md:w-2/3">
        {' '}
        <div className="text-center md:text-left">
          <h2 className="font-bold text-xl text-gray-800">{product.name}</h2>
          <h3 className="font-medium text-gray-800 ">
            {product.manufacturer.name}
          </h3>
        </div>
        <div className="flex gap-1 justify-center md:justify-start mt-2 text-gray-600">
          <div>{product.totalCount} items</div>
        </div>
        <div className="mt-4 max-w-96">
          <ToxicItemsChart toxicItems={product.toxicItems} />
        </div>
        <div className="flex mt-8">
          <StyledLink href="/products" className="flex  items-center gap-2">
            All products
          </StyledLink>
        </div>
      </div>
    </div>
  )
}
