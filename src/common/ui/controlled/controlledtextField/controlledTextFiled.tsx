import { Control, Controller } from 'react-hook-form'

import { AddFormValues } from '@/common/ui/modal/utils/schema'
import { TextField } from '@/common/ui/textFiled'

type Props = {
  control: Control<AddFormValues>
  errorMessage?: string
  label: string
  name: keyof AddFormValues
  pattern?: string
  type?: string
  variant: 'default'
}

export const ControlledTextField = ({
  control,
  errorMessage,
  label,
  name,
  pattern,
  type,
  variant,
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          errorMessage={errorMessage}
          label={label}
          pattern={pattern}
          type={type}
          variant={variant}
        />
      )}
    />
  )
}
