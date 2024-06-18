import { useAccount } from '@recycle-chain/util/src/hooks/ether'
import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useFormBulkStatusUpdate } from '@recycle-chain/forms/src/bulkStatusUpdate'
import { Button } from '../atoms/Button'
import { Dialog } from '../atoms/Dialog'
import { Form } from '../atoms/Form'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import {
  ProductStatus,
  namedOperations,
} from '@recycle-chain/network/src/gql/generated'
import { HtmlSelect } from '../atoms/HtmlSelect'
import { updateProductItemStatus } from '@recycle-chain/util/src/actions/updateProductItemStatus'
import { toast } from 'react-toastify'

const previousStatusMap: Partial<Record<ProductStatus, ProductStatus>> = {
  [ProductStatus.Sold]: ProductStatus.Manufactured,
  [ProductStatus.Returned]: ProductStatus.Sold,
  [ProductStatus.Recycled]: ProductStatus.Returned,
}

export const BulkStatusUpdateDialog = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { contract } = useAccount()
  const client = useApolloClient()

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useFormBulkStatusUpdate()

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        Bulk status update
      </Button>
      <Dialog open={open} setOpen={setOpen} title="Bulk status update">
        <Form
          onSubmit={handleSubmit(async ({ ids, status: targetStatus }) => {
            setLoading(true)
            const productItemIds = ids.split(',').map((id: string) => id.trim())

            const currentStatus = previousStatusMap[targetStatus]
            if (!currentStatus || !contract) {
              toast('Something went wrong')
              return
            }

            const status = await updateProductItemStatus({
              contract,
              payload: {
                productItemIds,
                currentStatus,
              },
            })
            if (status) {
              reset()
              setOpen(false)
              toast('Statuses updated.')
              client.refetchQueries({
                include: [
                  namedOperations.Query.ProductItems,
                  namedOperations.Query.Product,
                ],
              })
            } else {
              toast('Something went wrong.')
            }
            setLoading(false)
          })}
        >
          <HtmlLabel>
            <HtmlInput {...register('ids')} placeholder="1-1,1-2,..." />
          </HtmlLabel>
          <HtmlLabel title="Item Status" error={errors.status?.toString()}>
            <HtmlSelect placeholder="Item Status" {...register(`status`)}>
              {[
                ProductStatus.Sold,
                ProductStatus.Returned,
                ProductStatus.Recycled,
              ].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </HtmlSelect>
          </HtmlLabel>
          <Button loading={loading} type="submit">
            Submit
          </Button>
        </Form>
      </Dialog>
    </>
  )
}
