import { PageTitle } from '../atoms/PageTitle'
import { AlertSection } from '../molecules/AlertSection'
import { LoaderPanel } from '../molecules/Loader'
import { NoItemsFound } from '../molecules/NoItemsFound'
import { Pagination, PaginationProps } from '../molecules/Pagination'

interface ShowDataProps {
  error?: string
  loading?: boolean
  pagination: PaginationProps
  title?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export const ShowData: React.FC<ShowDataProps> = ({
  error,
  loading,
  pagination,
  title,
  children,
  className = 'grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ',
}) => {
  if (loading) {
    return <LoaderPanel />
  }

  if (error) {
    return (
      <div>
        <div className="font-bold text-lg">Error</div>
        <div>{error}</div>
      </div>
    )
  }

  return (
    <div>
      {title && <PageTitle>{title}</PageTitle>}
      <div className={` ${className ?? ''}`}>{children}</div>
      {pagination.totalCount === 0 ? <NoItemsFound /> : null}

      <Pagination
        setSkip={pagination.setSkip}
        setTake={pagination.setTake}
        skip={pagination.skip}
        take={pagination.take}
        resultCount={pagination.resultCount}
        totalCount={pagination.totalCount}
        className="mt-8"
      />
    </div>
  )
}
