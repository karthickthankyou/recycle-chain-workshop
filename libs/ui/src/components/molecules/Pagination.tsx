import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'

export interface PaginationProps {
  skip: number
  setSkip: (skip: number) => void
  take: number
  setTake: (take: number) => void

  resultCount?: number
  totalCount?: number

  className?: string
}

export const Pagination: React.FC<PaginationProps> = ({
  setSkip,
  setTake,
  skip,
  take,
  resultCount,
  totalCount,
  className,
}) => {
  const handleNext = () => {
    setSkip(skip + take)
  }

  const handlePrev = () => {
    setSkip(Math.max(skip - take, 0))
  }

  if (totalCount === 0) {
    return null
  }

  return (
    <div className={`flex mb-8 justify-center ${className}`}>
      <div className=" rounded flex items-center gap-3">
        <button
          onClick={handlePrev}
          disabled={skip === 0}
          className="disabled:text-gray-400 bg-white rounded-full"
        >
          <IconArrowLeft className="w-8 h-8" />
        </button>
        <span className="text-xl">
          {`${skip + 1} - ${skip + (resultCount || 0)}`}{' '}
          <span className="text-sm">of {totalCount}</span>
        </span>
        <button
          onClick={handleNext}
          disabled={skip + take >= (totalCount ?? 0)}
          className="disabled:text-gray-400 bg-white rounded-full"
        >
          <IconArrowRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  )
}
