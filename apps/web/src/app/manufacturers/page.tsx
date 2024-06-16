'use client'
import { useQuery } from '@apollo/client'
import { ManufacturersDocument } from '@recycle-chain/network/src/gql/generated'
import { SemiDonutChart } from '@recycle-chain/ui/src/components/organisms/SemiDonutChart2'

export default function Page() {
  const { data } = useQuery(ManufacturersDocument)
  return (
    <pre>
      Manufacuters {JSON.stringify(data, null, 2)}
      <SemiDonutChart
        width={300}
        height={300}
        innerRadiusFactor={0.75}
        data={[
          {
            label: 'MANUFACTURED',
            value: 12,
            color: 'hsl(142,2%,75%)',
          },
          {
            label: 'SOLD',
            value: 2,
            color: 'hsl(142,2%,36%)',
          },
          {
            label: 'RETURNED',
            value: 22,
            color: 'hsl(142, 76%, 75%)',
          },
          {
            label: 'RECYCLED',
            value: 121,
            color: 'hsl(142, 76%, 36%)',
          },
        ]}
      />
    </pre>
  )
}
