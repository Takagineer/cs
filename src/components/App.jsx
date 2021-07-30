import React from 'react'
import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'
// import Auth from './Auth'

const App = ({ children }) => (
  <MAin>
    {/* <Auth> */}
    <Header />
    {children}
    <Footer />
    {/* </Auth> */}
  </MAin>
)

export default App


const MAin = styled.main`
background-color:#d6e9ca;
`