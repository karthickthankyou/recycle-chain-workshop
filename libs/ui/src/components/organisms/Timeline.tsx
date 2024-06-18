import { ProductStatus } from '@recycle-chain/network/src/gql/generated'
import {
  IconArrowBackUp,
  IconBuildingFactory2,
  IconPlant,
  IconUser,
} from '@tabler/icons-react'
import { format } from 'date-fns'

export const Icons = {
  [ProductStatus.Manufactured]: <IconBuildingFactory2 />,
  [ProductStatus.Sold]: <IconUser />,
  [ProductStatus.Returned]: <IconArrowBackUp />,
  [ProductStatus.Recycled]: <IconPlant className="text-green-600" />,
}

export const Timeline = ({
  events,
  className,
}: {
  events: { timestamp: string; status: ProductStatus }[]
  className?: string
}) => {
  return (
    <div className={` flex flex-col   ${className}`}>
      {events.map((event, index) => {
        const lastItem = index === events.length - 1
        return (
          <div key={index} className="flex gap-2 items-start relative">
            <div className="flex flex-col items-center">
              <div
                className={`rounded-full border ${lastItem ? ' shadow-lg  shadow-black/30 border-black p-1' : 'bg-gray-50 border-gray-50 p-1 text-gray'}`}
              >
                {Icons[event.status]}
              </div>
              {!lastItem ? (
                <div className="w-0.5 h-full min-h-6 my-2 bg-gray-300"></div>
              ) : (
                <div className="my-2" />
              )}
            </div>
            <div>
              <div className={`${lastItem ? 'font-semibold' : ''} text-sm`}>
                {event.status}
              </div>
              <div className="text-xs text-gray-500">
                {format(new Date(event.timestamp), 'PPp')}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
