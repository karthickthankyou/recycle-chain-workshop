'use client'
import { CustomDonutChart } from '@recycle-chain/ui/src/components/organisms/CustomDonutChart'
import { UserInfo } from '@recycle-chain/ui/src/components/organisms/UserInfo'
import { Logo } from '@recycle-chain/ui/src/components/organisms/Logo'
import { SustainabilityScene } from '@recycle-chain/3d/src/scenes/SustainabilityScene'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className="absolute inset-x-0">
        <SustainabilityScene />
      </div>
      <div className="absolute inset-x-0 max-w-3xl p-6 md:p-12 text-white ">
        <h1 className="font-black text-4xl md:text-7xl sm:text-6xl">
          Where do our{' '}
          <span className="bg-gradient-to-tr from-gray to-red text-transparent bg-clip-text whitespace-nowrap">
            toxic wastes
          </span>{' '}
          go?
        </h1>
        <div className="flex gap-2 mt-4">
          <Link href="/manufacturers" className="bg-black text-white px-4 py-2">
            Manufacturers
          </Link>
          <Link href="/products" className="bg-black text-white px-4 py-2">
            Products
          </Link>
        </div>
      </div>
    </main>
  )
}
