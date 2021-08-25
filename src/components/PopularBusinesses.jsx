import { Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Content from "./Content";

export default function PopularBusinesses() {
  return (
    <>
      <COntainer>
        <Grid container direction="column">
          <Grid item container>
            <Grid sm={2} />
            <Grid xs={12} sm={8}>
              <Content />
            </Grid>
            <Grid sm={2} />
          </Grid>
        </Grid>
      </COntainer>
    </>
  );
}

const COntainer = styled.div`
  height: 300px;
  padding: 100px 0 0 40px;
`;
