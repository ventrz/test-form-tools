import styled from 'styled-components'

export const Button = styled.button.attrs(({ type = 'button' }) => ({ type }))`
  font-size: 1.3rem;
  font-weight: bold;
  background: white;

  :disabled {
    cursor: not-allowed;
    color: lightgray;
  }
`
