import * as React from 'react'

import { GetComponentProps } from '../../lib'
import { RawSelect } from '../atoms'
import { createControl } from './hoc'

interface ISelectExternalProps {
  options: IOption[]
}

interface IOption {
  value: string | number
  label: string
}

export const Select = createControl<ISelectExternalProps>(({ options, ...rest }) => (
  <RawSelect {...rest}>
    {options.map(({ value, label: optionLabel }) => (
      <option value={value} key={value}>
        {optionLabel}
      </option>
    ))}
  </RawSelect>
))

export type SelectProps = GetComponentProps<typeof Select>
