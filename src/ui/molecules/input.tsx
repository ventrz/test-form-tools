import { GetComponentProps } from '../../lib'
import { RawInput } from '../atoms'
import { createControl } from './hoc'

export const Input = createControl(RawInput)

export type InputProps = GetComponentProps<typeof Input>
