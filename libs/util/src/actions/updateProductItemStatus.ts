import { ProductStatus } from '@recycle-chain/network/src/gql/generated'
import { ActionType } from '../types'

export async function updateProductItemStatus({
  contract,
  payload: { productItemIds, currentStatus },
}: ActionType<{
  productItemIds: string[]
  currentStatus: ProductStatus
}>): Promise<boolean> {
  try {
    let tx
    if (currentStatus === ProductStatus.Manufactured) {
      tx = await contract.sellProductItems(productItemIds)
    } else if (currentStatus === ProductStatus.Sold) {
      tx = await contract.returnProductItems(productItemIds)
    } else if (currentStatus === ProductStatus.Returned) {
      tx = await contract.recycleProductItems(productItemIds)
    }

    if (tx) {
      const receipt = await tx.wait()
      return receipt?.status === 1
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return false
  }
}
