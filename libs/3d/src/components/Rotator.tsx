import React, { ReactNode, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

export const Rotator = ({
  children,
  speed = 1,
}: {
  children: ReactNode
  speed?: number
}) => {
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002 * speed
    }
  })

  return <group ref={groupRef}>{children}</group>
}
