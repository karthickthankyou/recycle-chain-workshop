import { ManufacturersQuery } from '@recycle-chain/network/src/gql/generated'
import { useAccount } from '@recycle-chain/util/src/hooks/ether'
import { ReactNode } from 'react'
import { CustomDonutChart } from './CustomDonutChart'
import { DonutChartSimplified } from './DonutChartSimplified'
import Link from 'next/link'

export const ManufacturerCard = ({
  manufacturer,
  children,
}: {
  manufacturer: ManufacturersQuery['manufacturers'][0]
  children?: ReactNode
}) => {
  const { account } = useAccount()
  const isYou = account.toLowerCase() === manufacturer.id.toLowerCase()

  return (
    <div className="bg-white flex flex-col p-4 shadow-lg h-full rounded">
      <DonutChartSimplified
        recycled={manufacturer.recycledCount}
        returned={manufacturer.returnedCount}
        sold={manufacturer.soldCount}
        total={manufacturer.totalCount}
      />

      <div>
        <div className="text-center mt-4">
          <div className="flex items-start justify-center gap-2 mt-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {manufacturer.name}
            </h2>
            {isYou ? (
              <div className="bg-black text-xs px-1 py-0.5 text-white">You</div>
            ) : null}
          </div>
          <p className="text-gray-500 mt-1 break-words text-sm">
            {manufacturer.id}
          </p>
        </div>

        <hr className="my-4" />

        <div className=" space-y-2">
          <div>
            <p className="text-gray-700 font-semibold">Address</p>
            <p className="text-gray-600">{manufacturer.location}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Contact</p>
            <p className="text-gray-600">{manufacturer.contact}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Products</p>
            <p className="text-gray-600">{manufacturer.productsCount}</p>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex justify-end mt-4">
          <Link
            href={`/manufacturers/${manufacturer.id}`}
            className="underline underline-offset-4 font-semibold text-lg"
            key={manufacturer.id}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}
