import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Link = styled(NavLink)`
  color: black;
  font-size: 1.5rem;
  font-weight: bold;

  &.active {
    color: red;
  }
`
