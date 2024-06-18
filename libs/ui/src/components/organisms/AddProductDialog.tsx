import {
  FormProviderCreateProduct,
  FormTypeCreateProduct,
} from '@recycle-chain/forms/src/createProduct'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '../atoms/Button'
import { Dialog } from '../atoms/Dialog'
import { Form } from '../atoms/Form'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { AddToxicItems } from './AddToxicItems'
import { addProduct } from '@recycle-chain/util/src/actions/addProduct'
import { useAccount } from '@recycle-chain/util/src/hooks/ether'
import { useApolloClient } from '@apollo/client'
import { namedOperations } from '@recycle-chain/network/src/gql/generated'

const AddProductContent = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<FormTypeCreateProduct>()
  const client = useApolloClient()

  const { contract } = useAccount()
  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        Add product
      </Button>
      <Dialog open={open} setOpen={setOpen} title={'Add product'}>
        <Form
          onSubmit={handleSubmit(async (data) => {
            console.log('data', data)
            const toxicNames = data.toxicItems.map((item) => item.name)
            const toxicWeights = data.toxicItems.map((item) => item.weight)

            if (!contract) {
              alert('Invalid contract.')
              return
            }

            setLoading(false)
            const status = await addProduct({
              contract,
              payload: { name: data.name, toxicNames, toxicWeights },
            })
            if (status) {
              reset()
              client.refetchQueries({
                include: [namedOperations.Query.Products],
              })
              setOpen(false)
              alert('Product created successfully.')
            }
            setLoading(true)
          })}
        >
          <HtmlLabel title="Name" error={errors.name?.message}>
            <HtmlInput placeholder="Enter name" {...register('name')} />
          </HtmlLabel>

          <AddToxicItems />
          <Button fullWidth loading={loading} type="submit">
            Submit
          </Button>
        </Form>
      </Dialog>
    </>
  )
}

export const AddProductDialog = () => {
  return (
    <FormProviderCreateProduct>
      <AddProductContent />
    </FormProviderCreateProduct>
  )
}
