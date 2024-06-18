import Link from 'next/link'
import { ReactNode } from 'react'

export const StyledLink = ({
  children,
  href,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) => {
  return (
    <Link
      href={href}
      className={`underline underline-offset-4 text-lg font-semibold ${className}`}
    >
      {children}
    </Link>
  )
}
