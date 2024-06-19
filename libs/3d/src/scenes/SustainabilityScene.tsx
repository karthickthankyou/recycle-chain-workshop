import { BaseComponent } from '@recycle-chain/util/src/types'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import React from 'react'
import { Globe } from '../components/Globe'
import { Rotator } from '../components/Rotator'
import { radians } from '../util'

export const SustainabilityScene = ({
  children,
  className = '',
}: BaseComponent) => (
  <Canvas
    style={{
      zIndex: 0,
      height: `calc(100vh - 4rem)`,
      background:
        'linear-gradient(to top right, hsl(10, 15%, 10%), hsl(10, 3%, 5%))',
    }}
  >
    <OrbitControls
      minPolarAngle={radians(0)}
      maxPolarAngle={radians(108.5)}
      minDistance={60}
      maxDistance={600}
    />
    <Rotator>
      <Globe />
    </Rotator>
  </Canvas>
)
