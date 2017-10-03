import React from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Client } from './apolloclient'
import { ApolloProvider } from 'react-apollo';
import { Header } from './components/header'


const AppContainer = styled.div`
display: block;
width: 100%;
height: 100%;
`

const App = ({ children }) => (
  <ApolloProvider client={Client}>
    <AppContainer>
      <Header />
        {children}
    </AppContainer>
  </ApolloProvider>
)

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default App
