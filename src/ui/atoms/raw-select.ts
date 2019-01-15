import styled from 'styled-components'

import { IInvalidProps, inputStyles } from '../styles'

export const RawSelect = styled.select<IInvalidProps>`
  background-color: white;
  ${inputStyles}
`
