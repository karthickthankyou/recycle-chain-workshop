import { useState } from 'react'
import { TAKE_COUNT } from '../constants'

export const useTakeSkip = (initialSkip = 0, initialTake = TAKE_COUNT) => {
  const [skip, setSkip] = useState(() => initialSkip)
  const [take, setTake] = useState(() => initialTake)

  return { take, skip, setTake, setSkip }
}
