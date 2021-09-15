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
      <AppBar position="static">
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
                <div>
                  <Link href="/auth/CompanySignIn">
                    <MenuItem onClick={handleCloseCompany}>ログイン</MenuItem>
                  </Link>
                  <Link href="/auth/CompanySignUp">
                    <MenuItem onClick={handleCloseCompany}>新規登録</MenuItem>
                  </Link>
                </div>
              ) : (
                <Link
                  href={{
                    pathname: "individual-pages/[company]",
                    query: { company: auth.currentUser.uid },
                  }}
                >
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
                <div>
                  <Link href="/auth/StudentSignIn">
                    <MenuItem onClick={handleCloseStudent}>ログイン</MenuItem>
                  </Link>
                  <Link href="/auth/StudentSignUp">
                    <MenuItem onClick={handleCloseStudent}>新規登録</MenuItem>
                  </Link>
                </div>
              ) : (
                <Link href="/individual-pages/Student">
                  <MenuItem onClick={handleCloseStudent}>
                    学生用マイページ
                  </MenuItem>
                </Link>
              )}
            </Menu>
            {/* 学生用のログインページへの記述 */}
          </HEaderRight>
          {/* <Button color="inherit">ログイン</Button> */}
        </Toolbar>
      </AppBar>
    </HEader>
  );
}

const HEader = styled.header`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
`;

const HEaderRight = styled.div`
  margin: 0 0 0 auto;
`;

const BUtton = styled(Button)`
  background: (0, 0%, 61.96%);
  font-size: 18px;
  justify-content: right;
`;
