import { ActionType } from '../types'

export async function addProductItems({
  contract,
  payload: { productId, quantity },
}: ActionType<{
  productId: string
  quantity: number
}>) {
  try {
    const tx = await contract.addProductItems(productId, quantity)
    const receipt = await tx.wait()
    return receipt?.status === 1
  } catch (error) {
    console.error(error)
    return false
  }
}
