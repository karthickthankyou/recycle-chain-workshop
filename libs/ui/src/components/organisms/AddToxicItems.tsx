import { FormTypeCreateProduct } from '@recycle-chain/forms/src/createProduct'
import { BaseComponent } from '@recycle-chain/util/src/types'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { HtmlInput } from '../atoms/HtmlInput'
import { Button } from '../atoms/Button'
import { FormError } from '../atoms/FormError'

export const AddToxicItems = ({ className }: { className?: string }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormTypeCreateProduct>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'toxicItems',
  })

  return (
    <div className={className}>
      <h3 className=" font-semibold">Toxic Items</h3>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div className="grid grid-cols-2 gap-2">
            <HtmlInput
              {...register(`toxicItems.${index}.name` as const)}
              placeholder="Item Name"
            />

            <HtmlInput
              {...register(`toxicItems.${index}.weight`, {
                valueAsNumber: true,
              })}
              placeholder="Item Weight in mg"
              type="number"
            />
          </div>
          <div className="flex justify-end">
            <Button variant="text" type="button" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        </div>
      ))}
      <Button
        className="text-center"
        variant="outlined"
        fullWidth
        onClick={() => append({ name: '', weight: 0 })}
      >
        Add Toxic Item
      </Button>
    </div>
  )
}
