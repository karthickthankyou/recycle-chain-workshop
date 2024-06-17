'use client'
import { CustomDonutChart } from '@recycle-chain/ui/src/components/organisms/CustomDonutChart'
import { UserInfo } from '@recycle-chain/ui/src/components/organisms/UserInfo'
import { Logo } from '@recycle-chain/ui/src/components/organisms/Logo'

export default function Home() {
  return (
    <main>
      Hello World
      <CustomDonutChart
        data={[
          {
            label: 'MANUFACTURED',
            value: 19,
            color: 'hsl(142,2%,75%)',
          },
          {
            label: 'SOLD',
            value: 23,
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
    </main>
  )
}
