import * as React from 'react'
import styled from 'styled-components'

import { Badge, Description, Error, Label as RawLabel, Relative } from '../../atoms'
import { IInvalidProps } from '../../styles'

function renderHelp<T>(help: T | T[], Wrapper: React.ComponentType) {
  return Array.isArray(help) ? help.map((v, index) => <Wrapper key={index}>{v}</Wrapper>) : <Wrapper>{help}</Wrapper>
}

interface IBaseControlProps {
  id?: string
  label?: string
  error?: React.ReactNode
  description?: React.ReactNode
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const Label = styled(RawLabel)`
  align-self: flex-end;
`

export function createControl<SelfProps = {}>(
  Component: React.ComponentType<IBaseControlProps & SelfProps & IInvalidProps>
) {
  return class extends React.Component<IBaseControlProps & SelfProps> {
    rendersCount = 0

    render() {
      const { description, error, id, label } = this.props
      const errorContent = renderHelp(error, Error)
      const descriptionContent = renderHelp(description, Description)

      return (
        <Relative>
          <Header>
            <Label htmlFor={id}>{label}</Label>
            <Badge>{++this.rendersCount}</Badge>
          </Header>
          <Component {...this.props} invalid={!!error} />
          {error ? errorContent : descriptionContent}
        </Relative>
      )
    }
  }
}
