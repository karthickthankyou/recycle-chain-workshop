import { IconBox } from '@tabler/icons-react'
import { ReactNode } from 'react'

export const NoItemsFound = ({
  children = 'No items found.',
}: {
  children?: ReactNode
}) => {
  return (
    <div className="h-[150px] w-full flex-col flex justify-center items-center">
      <IconBox />
      <div className="text-gray">{children}</div>
    </div>
  )
}
