import * as React from 'react'
import styled from 'styled-components'

import { Centered, Link as RawLink } from '../atoms'

const Link = styled(RawLink)`
  :not(:last-child) {
    margin-right: 1rem;
  }
`

const Wrapper = styled(Centered)`
  margin-top: 1rem;
  margin-bottom: 2rem;
`

export const Header = () => (
  <Wrapper>
    <Link to="/rff">React Final Form</Link>
    <Link to="/formik">Formik</Link>
  </Wrapper>
)
