import { Vector3 } from 'three'

export const DURATION = 12
export const SPAWN_INTERVAL = 0.2
export const extractor = [
  {
    position: new Vector3(-30, -12, 20.78),
    rotationAngle: -60,
    initialDelay: 0,
  },
  {
    position: new Vector3(-30, -12, -20.78),
    rotationAngle: 60,
    initialDelay: 0,
  },
  {
    position: new Vector3(-30, 24, 0),
    rotationAngle: 180,
    initialDelay: 0,
  },
]

export const pollution = [
  {
    position: new Vector3(-30, -18, 31.18),
    rotationAngle: 120,
    initialDelay: DURATION / 4,
  },
  {
    position: new Vector3(-30, -18, -31.18),
    rotationAngle: 240,
    initialDelay: DURATION / 4,
  },
  {
    position: new Vector3(-30, 36, 0),
    rotationAngle: 0,
    initialDelay: DURATION / 4,
  },
]
