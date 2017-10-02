import React, { Component } from 'react';
import styled from 'styled-components'
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';

const AppContainer = styled.div`
display: flex;
width: 100%;
height: 100%;
flex-direction: column;
`

class App extends Component {

  render() {
    return (
      <AppContainer>
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </AppContainer>
    );
  }
}

export default App
