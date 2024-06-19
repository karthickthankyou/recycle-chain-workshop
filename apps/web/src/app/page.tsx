'use client'
import { CustomDonutChart } from '@recycle-chain/ui/src/components/organisms/CustomDonutChart'
import { UserInfo } from '@recycle-chain/ui/src/components/organisms/UserInfo'
import { Logo } from '@recycle-chain/ui/src/components/organisms/Logo'
import { SustainabilityScene } from '@recycle-chain/3d/src/scenes/SustainabilityScene'

export default function Home() {
  return (
    <main>
      <SustainabilityScene />
    </main>
  )
}
