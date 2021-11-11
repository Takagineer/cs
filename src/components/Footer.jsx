import React from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";

const Header = ({ pathname }) => (
  <FOoter>
    <APpBar position="static">
      <Toolbar>
        <Link href="/">
          <Typography variant="h6">C×S</Typography>
        </Link>

        <Typography variant="h6">©︎CS</Typography>
      </Toolbar>
    </APpBar>
  </FOoter>
);

export default Header;

const FOoter = styled.footer`
  width: 100vw;
`;

const APpBar = styled(AppBar)`
  width: 100%;
`;
