'use client'
import { IconMenu2 } from '@tabler/icons-react'
import { Sidebar } from './Sidebar'
import { useDialogState } from '@recycle-chain/util/src/hooks/dialog'

import { MenuItem } from '@recycle-chain/util/src/types'
import { Menus } from './Menus'
import { UserInfo } from './UserInfo'

export interface INavSidebarProps {
  menuItems: MenuItem[]
}

export const NavSidebar = ({ menuItems }: INavSidebarProps) => {
  const [open, setOpen] = useDialogState()

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((state) => !state)}
        className="p-2"
        aria-label="Open main menu"
      >
        <IconMenu2 className="w-5 h-5" />
      </button>
      <Sidebar open={open} setOpen={setOpen}>
        <UserInfo className="mb-8" />
        <div className="flex flex-col items-start gap-3">
          <Menus menuItems={menuItems} />
        </div>
      </Sidebar>
    </>
  )
}
