import { NoItemsFound } from '../molecules/NoItemsFound'
import { CustomDonutChart } from './CustomDonutChart'

interface IDonutChartSimplifiedProps {
  total: number
  sold: number
  returned: number
  recycled: number
}

export const DonutChartSimplified: React.FC<IDonutChartSimplifiedProps> = ({
  total,
  recycled,
  returned,
  sold,
}) => {
  const manufactured = total - (sold + returned + recycled)

  if (!total) {
    return (
      <div className="aspect-[4/3]  flex flex-col justify-center">
        <NoItemsFound />
      </div>
    )
  }

  return (
    <CustomDonutChart
      data={[
        {
          label: 'MANUFACTURED',
          value: manufactured,
          color: 'hsl(142,2%,75%)',
        },
        {
          label: 'SOLD',
          value: sold,
          color: 'hsl(142,2%,36%)',
        },
        {
          label: 'RETURNED',
          value: returned,
          color: 'hsl(142, 76%, 75%)',
        },
        {
          label: 'RECYCLED',
          value: recycled,
          color: 'hsl(142, 76%, 36%)',
        },
      ]}
    />
  )
}
