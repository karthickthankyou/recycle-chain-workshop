import { ActionType } from '../types'

export async function addProduct({
  contract,
  payload: { name, toxicNames, toxicWeights },
}: ActionType<{
  name: string
  toxicNames: string[]
  toxicWeights: number[]
}>) {
  try {
    const tx = await contract.addProduct(name, toxicNames, toxicWeights)
    const receipt = await tx.wait()
    return receipt?.status === 1
  } catch (error) {
    console.error(error)
    return false
  }
}
