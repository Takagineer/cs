import { Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Content from "./Content";

export default function PopularBusinesses() {
  return (
    <>
      <COntainer>
        <Content />
      </COntainer>
    </>
  );
}

const COntainer = styled.div`
  height: 500px;
  padding: 100px;
`;
