import {
  ProductItemsQuery,
  ProductStatus,
} from '@recycle-chain/network/src/gql/generated'
import { Timeline } from './Timeline'

export interface IProductItemCardProps {
  productItem: NonNullable<ProductItemsQuery['productItems']>[0]
  isOwner?: boolean
}

export const ProductItemCard = ({
  productItem,

  isOwner = false,
}: IProductItemCardProps) => {
  return (
    <div
      className={`p-4 bg-white rounded ${productItem.status === ProductStatus.Recycled ? 'border-2 border-green-600 shadow-lg' : ''}`}
    >
      <div className="flex flex-col">
        <div className="text-3xl mt-2 font-light mb-2 ">{productItem.id}</div>
        <div className="text-sm text-gray">{productItem.product.name}</div>
      </div>
      <Timeline events={productItem.transactions} className="mt-6" />
    </div>
  )
}
