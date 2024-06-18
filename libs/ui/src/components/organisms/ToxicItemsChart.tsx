import { ProductsQuery } from '@recycle-chain/network/src/gql/generated'

type ToxicItemsProps = {
  toxicItems: ProductsQuery['products'][0]['toxicItems']
}
export const ToxicItemsChart: React.FC<ToxicItemsProps> = ({ toxicItems }) => {
  const totalWeight = toxicItems.reduce((sum, item) => sum + item.weight, 0)

  return (
    <div className="w-full">
      {toxicItems.map((item) => {
        const widthPercentage = (item.weight / totalWeight) * 100

        return (
          <div key={item.id} className="mb-4">
            <div className="text-sm flex justify-between">
              <span className="font-medium">{item.name}</span>{' '}
              <span className="text-gray text-sm">{item.weight}mg</span>
            </div>
            <div className="w-full bg-gray-25 h-1 rounded">
              <div
                className="bg-gradient-to-tr from-gray-800 to-gray-200 h-full rounded"
                style={{ width: `${widthPercentage}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
