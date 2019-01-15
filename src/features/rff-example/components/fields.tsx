import * as React from 'react'
import { Field, FieldProps, FieldRenderProps } from 'react-final-form'

import { Input, InputProps, Select, SelectProps } from '../../../ui'

type ExternalInputProps = Pick<InputProps, 'label'>
type ExternalSelectProps = Pick<SelectProps, 'label' | 'options'>

const InputComponent: React.FC<ExternalInputProps & FieldRenderProps> = ({
  input,
  meta: { error, touched },
  ...rest
}) => {
  const errorMessage = touched && error

  return <Input error={errorMessage} {...input} {...rest} />
}

// TODO: copypaste
const SelectComponent: React.FC<ExternalSelectProps & FieldRenderProps> = ({
  input,
  meta: { error, touched },
  ...rest
}) => {
  const errorMessage = touched && error

  return <Select error={errorMessage} {...input} {...rest} />
}

export const Fields = {
  Input: (props: FieldProps & ExternalInputProps) => <Field {...props} component={InputComponent} />,
  Select: (props: FieldProps & ExternalSelectProps) => <Field {...props} component={SelectComponent} />,
}
