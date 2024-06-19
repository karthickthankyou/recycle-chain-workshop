import React, { ReactNode, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SpawnedItem } from '../util/types'
import { ProgressiveRotator } from './ProgressiveRotator'
import { SPAWN_INTERVAL } from '../util/constants'

interface ISpawnerProps {
  spawnInterval?: number
  initialRotation: number
  endRotation: number
  duration: number

  position?: THREE.Vector3
  initialDelay?: number

  children: ReactNode
}

export const Spawner: React.FC<ISpawnerProps> = ({
  spawnInterval = SPAWN_INTERVAL,
  initialRotation,
  endRotation,
  duration,
  position,
  initialDelay = 0,

  children,
}) => {
  const [items, setItems] = useState<Array<SpawnedItem>>([])
  const lastSpawnTime = useRef<number>(Date.now() + initialDelay * 1000)

  useFrame((_, delta) => {
    if (Date.now() - lastSpawnTime.current >= spawnInterval * 1000) {
      const id = Date.now()
      lastSpawnTime.current = id
      setItems((prevItems) => [...prevItems, { id, progress: 0 }])
    }

    setItems((prevItems) =>
      prevItems
        .map((item) => {
          const progress = item.progress + delta / duration
          if (progress >= 1) {
            return null
          }
          return { ...item, progress }
        })
        .filter((item): item is SpawnedItem => item !== null),
    )
  })

  return (
    <>
      {items.map((item) => (
        <ProgressiveRotator
          key={item.id}
          initialRotation={initialRotation}
          endRotation={endRotation}
          progress={item.progress}
          position={position}
          scale={new THREE.Vector3(3, 3, 3)}
        >
          {children}
        </ProgressiveRotator>
      ))}
    </>
  )
}
