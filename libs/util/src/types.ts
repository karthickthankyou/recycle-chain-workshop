import { ReactNode } from 'react'
import { Icon as IconType } from '@tabler/icons-react'
import { RecycleChain } from './generated/typechain-types'

export type MenuItem = {
  label: string
  href: string
  Icon: IconType
}

export type BaseComponent = {
  children?: ReactNode
  className?: string
}

export type ActionType<T = string> = {
  contract: RecycleChain
  payload: T
}
