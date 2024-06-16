'use client'
import { BaseComponent, MenuItem } from '@recycle-chain/util/src/types'
import { IconBox, IconBuildingFactory2, IconHome } from '@tabler/icons-react'
import { Container } from '../atoms/Container'
import Link from 'next/link'
import { Menus } from './Menus'
import { NavSidebar } from './NavSidebar'
import { Logo } from './Logo'

const MENUITEMS: MenuItem[] = [
  { label: 'Home', href: '/', Icon: IconHome },
  {
    label: 'Manufacturers',
    href: '/manufacturers',
    Icon: IconBuildingFactory2,
  },
  { label: 'Products', href: '/products', Icon: IconBox },
]

export const Header = () => {
  return (
    <header>
      <nav className="fixed z-50 top-0 w-full  bg-white">
        <Container className="relative   flex items-center justify-between h-16 py-2">
          <div className="relative flex items-center justify-between w-full gap-16">
            <Link href="/" aria-label="Home" className="w-auto z-50">
              <Logo />
            </Link>
            <div className="flex items-center gap-2">
              <div className="text-sm mr-6  gap-5 hidden md:flex">
                <Menus menuItems={MENUITEMS} />
              </div>
              <NavSidebar menuItems={MENUITEMS} />
            </div>
          </div>
        </Container>
      </nav>
      <div className="h-16" />
    </header>
  )
}
