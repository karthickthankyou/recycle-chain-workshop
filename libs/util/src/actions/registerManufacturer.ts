import { ActionType } from '../types'

export async function registerManufacturer({
  contract,
  payload: { name, location, contact },
}: ActionType<{
  name: string
  location: string
  contact: string
}>): Promise<boolean> {
  try {
    const tx = await contract.registerManufacturer(name, location, contact)
    const receipt = await tx.wait()
    return receipt?.status === 1
  } catch (error) {
    console.error(error)
    return false
  }
}
