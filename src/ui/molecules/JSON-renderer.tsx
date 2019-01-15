import * as React from 'react'
import styled from 'styled-components'

import { IBaseComponent } from '../../lib'

const Pre = styled.pre`
  font-size: 1.7rem;
  margin: 0;
`

const Wrapper = styled.div`
  border-radius: 0.3rem;
  border: 1px solid grey;
  background: lightgray;
  padding: 1rem;
`

interface IOwnJSONRendererProps {
  src: object
}

export const JSONRenderer: React.FC<IBaseComponent & IOwnJSONRendererProps> = ({ className, src }) => (
  <Wrapper className={className}>
    <Pre>{JSON.stringify(src, null, 2)}</Pre>
  </Wrapper>
)
