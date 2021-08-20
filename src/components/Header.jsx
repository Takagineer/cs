import React from "react";
import Link from "next/link";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import styled from "styled-components";
import { auth } from "../firebase";

export default function Header({ pathname }) {
  return (
    <HEader>
      <APpBar position="static">
        <Toolbar>
          <Link href="/">
            <Typography variant="h6">C×S</Typography>
          </Link>

          <HEaderRight>
            <Link href="/individual-pages/Guide">
              <BUtton color="inherit">使い方ページへ</BUtton>
            </Link>
            {""}

            {/* 企業用のログインページへのリンク */}
            {auth.currentUser === null ? (
              <Link href="/auth/SignIn">
                <BUtton color="inherit">ログインページへ</BUtton>
              </Link>
            ) : (
              <Link href="/individual-pages/Company">
                <BUtton color="inherit">企業用ページ</BUtton>
              </Link>
            )}
            {/* 企業用のログインページへの記述 */}

            {/* 学生用のログインページへの記述 */}
            {auth.currentUser === null ? (
              <Link href="/auth/SignIn">
                <BUtton color="inherit">ログインページへ</BUtton>
              </Link>
            ) : (
              <Link href="/individual-pages/Student">
                <BUtton color="inherit">学生用ページ</BUtton>
              </Link>
            )}
            {/* 学生用のログインページへの記述 */}
          </HEaderRight>
          {/* <Button color="inherit">ログイン</Button> */}
        </Toolbar>
      </APpBar>
    </HEader>
  );
}

const HEader = styled.header`
  position: fixed;
  width: 100%;
`;

const APpBar = styled(AppBar)`
  border-radius: 10px;
`;

const HEaderRight = styled.div`
  margin: 0 0 0 auto;
`;

const BUtton = styled(Button)`
  background: (0, 0%, 61.96%);
  font-size: 18px;
  justify-content: right;
`;
