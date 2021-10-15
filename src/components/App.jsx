import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { RecoilRoot } from "recoil";

const App = ({ children }) => (
  <RecoilRoot>
    <MAin>
      <Header />
      {children}
      <Footer />
    </MAin>
  </RecoilRoot>
);

export default App;

const MAin = styled.main`
  overflow-y: scroll;
`;
