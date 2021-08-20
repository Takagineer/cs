import React, { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import styled from "styled-components";
import { auth } from "../firebase";

export default function Header({ pathname }) {
  const [anchorElCompany, setAnchorElCompany] = useState(null);
  const [anchorElStudent, setAnchorElStudent] = useState(null);

  const handleClickCompany = (event) => {
    setAnchorElCompany(event.currentTarget);
  };
  const handleClickStudent = (event) => {
    setAnchorElStudent(event.currentTarget);
  };

  const handleCloseCompany = () => {
    setAnchorElCompany(null);
  };
  const handleCloseStudent = () => {
    setAnchorElStudent(null);
  };
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
            <BUtton color="inherit" onClick={handleClickCompany}>
              企業用ページ
            </BUtton>
            <Menu
              id="simple-menu"
              anchorEl={anchorElCompany}
              keepMounted
              open={Boolean(anchorElCompany)}
              onClose={handleCloseCompany}
            >
              {auth.currentUser === null ? (
                <>
                  <Link href="/auth/SignIn">
                    <MenuItem onClick={handleCloseCompany}>ログイン</MenuItem>
                  </Link>
                  <Link href="/auth/SignIn">
                    <MenuItem onClick={handleCloseCompany}>新規登録</MenuItem>
                  </Link>
                </>
              ) : (
                <Link href="/individual-pages/Company">
                  <MenuItem onClick={handleCloseCompany}>
                    企業様マイページへ
                  </MenuItem>
                </Link>
              )}
            </Menu>
            {/* 企業用のログインページへの記述 */}

            {/* 学生用のログインページへの記述 */}
            <BUtton color="inherit" onClick={handleClickStudent}>
              学生用ページへ
            </BUtton>
            <Menu
              id="simple-menu"
              anchorEl={anchorElStudent}
              keepMounted
              open={Boolean(anchorElStudent)}
              onClose={handleCloseStudent}
            >
              {auth.currentUser === null ? (
                <>
                  <Link href="/auth/SignIn">
                    <MenuItem onClick={handleCloseStudent}>ログイン</MenuItem>
                  </Link>
                  <Link href="/auth/SignIn">
                    <MenuItem onClick={handleCloseStudent}>新規登録</MenuItem>
                  </Link>
                </>
              ) : (
                <MenuItem onClick={handleCloseStudent}>
                  学生用マイページ
                </MenuItem>
              )}
            </Menu>
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
