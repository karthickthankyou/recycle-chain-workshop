'use client'

import { useFormRegisterManufacturer } from '@recycle-chain/forms/src/registerManufacturer'
import { useAccount } from '@recycle-chain/util/src/hooks/ether'
import { useState } from 'react'
import { Form } from '../atoms/Form'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { HtmlTextArea } from '../atoms/HtmlTextArea'
import { Button } from '../atoms/Button'
import { PageTitle } from '../atoms/PageTitle'
import { registerManufacturer } from '@recycle-chain/util/src/actions/registerManufacturer'
import { useRouter } from 'next/navigation'
import { useApolloClient } from '@apollo/client'
import { namedOperations } from '@recycle-chain/network/src/gql/generated'

export const RegisterManufacturer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormRegisterManufacturer()
  const { contract, account } = useAccount()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const client = useApolloClient()

  return (
    <div className="max-w-md w-full p-4 mt-20 bg-white rounded">
      <PageTitle>Register</PageTitle>
      <Form
        onSubmit={handleSubmit(async ({ contact, location, name }) => {
          if (!contract) {
            console.error('Contract not found')
            return
          }

          setLoading(true)
          const success = await registerManufacturer({
            contract,
            payload: { name, location, contact },
          })
          setLoading(false)

          if (success) {
            reset()
            router.replace(`/manufacturers/${account}`)
            client.refetchQueries({
              include: [namedOperations.Query.Manufacturer],
            })
          } else {
            alert('Registration failed')
          }
        })}
      >
        <HtmlLabel title="Name" error={errors.name?.message}>
          <HtmlInput placeholder="Enter name" {...register('name')} />
        </HtmlLabel>
        <HtmlLabel title="Address" error={errors.location?.message}>
          <HtmlTextArea placeholder="Enter address" {...register('location')} />
        </HtmlLabel>
        <HtmlLabel title="Contact" error={errors.contact?.message}>
          <HtmlInput placeholder="Enter contact" {...register('contact')} />
        </HtmlLabel>
        <Button loading={loading} type="submit">
          Register
        </Button>
      </Form>
    </div>
  )
}
