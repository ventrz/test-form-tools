import * as React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import { FormikExample } from './features/formik-example'
import { RFFExample } from './features/rff-example'
import { Header } from './ui'

const GlobalStyle = createGlobalStyle`
  html {
    font-size: .625em; /* 10px */
    font-family: system-ui, sans-serif;
  }

  button, input {
    font-family: system-ui, sans-serif;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  #root {
    height: 100%;
  }
`

export const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/formik" component={FormikExample} />
        <Route path="/rff" component={RFFExample} />
        <Redirect to="/rff" />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
)
