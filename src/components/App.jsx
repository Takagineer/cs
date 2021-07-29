import React from 'react'
import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'

const App = ({ children }) => (
  <MAin>
    <Header />
    {children}
    <Footer />
  </MAin>
)

export default App


const MAin = styled.main`
background-color:#d6e9ca;
`