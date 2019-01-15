import { css } from 'styled-components'

export interface IInvalidProps {
  invalid?: boolean
}

export const ifInvalid = ({ invalid }: IInvalidProps) => invalid && 'border: 1px solid red'

export const inputStyles = css`
  width: 100%;
  padding: 0 0.5rem;
  font-size: 1.4rem;
  box-sizing: border-box;
  border-radius: 0;
  ${ifInvalid}
`
