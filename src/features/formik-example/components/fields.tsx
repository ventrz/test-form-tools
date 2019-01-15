import { FastField, Field, FieldConfig, FieldProps } from 'formik'
import { path } from 'ramda'
import * as React from 'react'

import { Input, InputProps, Select, SelectProps } from '../../../ui'

type ExternalInputProps = Pick<InputProps, 'label'>
type ExternalSelectProps = Pick<SelectProps, 'label' | 'options'>

const InputComponent: React.FC<FieldProps & ExternalInputProps> = ({ field, form: { errors, touched }, ...rest }) => {
  const fieldPath = field.name.split('.')
  const isTouched = path(fieldPath, touched)
  const errorMessage = path(fieldPath, errors)
  const error = isTouched && errorMessage

  return <Input error={error} {...field} {...rest} />
}

// TODO: copypaste
const SelectComponent: React.FC<FieldProps & ExternalSelectProps> = ({ field, form: { errors, touched }, ...rest }) => {
  const fieldPath = field.name.split('.')
  const isTouched = path(fieldPath, touched)
  const errorMessage = path(fieldPath, errors)
  const error = isTouched && errorMessage

  return <Select error={error} {...field} {...rest} />
}

export const Fields = {
  Input: (props: FieldConfig & ExternalInputProps) => <Field {...props} component={InputComponent} />,
  Select: (props: FieldConfig & ExternalSelectProps) => <Field {...props} component={SelectComponent} />,
}

export const FastFields = {
  Input: (props: FieldConfig & ExternalInputProps) => <FastField {...props} component={InputComponent} />,
  Select: (props: FieldConfig & ExternalSelectProps) => <FastField {...props} component={SelectComponent} />,
}
