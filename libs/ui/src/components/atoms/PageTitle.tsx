import { ReactNode } from 'react'

export interface IPageTitleProps {
  children: ReactNode
}

export const PageTitle = ({ children }: IPageTitleProps) => {
  return <h1 className="mt-6 mb-3 text-2xl ">{children}</h1>
}
