import { BaseComponent } from '@recycle-chain/util/src/types'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import React from 'react'
import { Globe } from '../components/Globe'
import { Rotator } from '../components/Rotator'
import { radians } from '../util'
import { Color, Euler, Vector3 } from 'three'
import { Spawner } from '../components/Spawner'
import { Circle } from '../components/Circle'
import {
  DURATION,
  SPAWN_INTERVAL,
  extractor,
  pollution,
} from '../util/constants'
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
    <PerspectiveCamera
      makeDefault
      fov={30}
      near={0.1}
      far={1000}
      position={[400, -60, 0]}
      rotation={[radians(0), radians(90), 0]}
    />

    <OrbitControls
      minPolarAngle={radians(0)}
      maxPolarAngle={radians(107.5)}
      minDistance={60}
      maxDistance={800}
    />
    <Rotator>
      <Globe />
      <group rotation={new Euler(radians(0), radians(-90), radians(90))}>
        <Spawner
          spawnInterval={SPAWN_INTERVAL * 1.25}
          duration={DURATION * 1.5}
          initialRotation={radians(240)}
          endRotation={radians(-120)}
          initialDelay={DURATION / 4}
        >
          <Circle distance={11} />
        </Spawner>
        <Spawner
          spawnInterval={SPAWN_INTERVAL * 1.25}
          duration={DURATION * 1.25}
          initialRotation={radians(360)}
          endRotation={radians(0)}
          initialDelay={DURATION / 4}
        >
          <Circle distance={10} />
        </Spawner>
        <Spawner
          spawnInterval={SPAWN_INTERVAL * 1.25}
          duration={DURATION * 1}
          initialRotation={radians(120)}
          endRotation={radians(-240)}
          initialDelay={DURATION / 4}
        >
          <Circle distance={9} />
        </Spawner>

        {extractor.map(({ position, rotationAngle, initialDelay }) => (
          <group
            key={rotationAngle}
            position={position}
            rotation={new Euler(0, radians(90), radians(rotationAngle))}
          >
            <Spawner
              initialDelay={initialDelay}
              initialRotation={radians(0)}
              endRotation={radians(90)}
              duration={DURATION / 4}
              position={new Vector3(0, 0, 0)}
            >
              <Circle
                color={new Color('white')}
                rotation={new Euler(radians(-90), 0, 0)}
                distance={10}
              />
            </Spawner>
          </group>
        ))}
        {pollution.map(({ position, rotationAngle, initialDelay }) => (
          <group
            key={rotationAngle}
            position={position}
            rotation={new Euler(0, radians(90), radians(rotationAngle))}
          >
            <Spawner
              initialDelay={initialDelay}
              spawnInterval={SPAWN_INTERVAL * 2}
              initialRotation={radians(90)}
              endRotation={radians(0)}
              duration={DURATION / 4}
              position={new Vector3(0, 0, 0)}
            >
              <Circle
                color={new Color('darkred')}
                rotation={new Euler(radians(-90), 0, 0)}
                distance={10}
              />
            </Spawner>
          </group>
        ))}
      </group>
    </Rotator>
  </Canvas>
)
