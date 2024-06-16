import { MenuItem } from '@recycle-chain/util/src/types'
import Link from 'next/link'

export interface IMenuItemProps {
  menuItems: MenuItem[]
}

export const Menus = ({ menuItems }: IMenuItemProps) => {
  return (
    <>
      {menuItems.map(({ label, href, Icon }) => (
        <Link
          className="hover:underline underline-offset-8 "
          key={label}
          href={href}
        >
          <div className="flex gap-1 items-center font-medium text-lg">
            <Icon /> {label}
          </div>
        </Link>
      ))}
    </>
  )
}
