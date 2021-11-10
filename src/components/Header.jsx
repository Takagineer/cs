import React, { useEffect, useState } from "react";
import Link from "next/Link";
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
import { auth, db } from "../firebase";
import { useRecoilState } from "recoil";
import { userState } from "../store/userState";

export default function Header({ pathname }) {
  const [anchorElCompany, setAnchorElCompany] = useState(null);
  const [anchorElStudent, setAnchorElStudent] = useState(null);
  const [logInUser, setLogInUser] = useRecoilState(userState);

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

  const checkExistWhichCollection = async () => {
    if (auth.currentUser === null) {
      setLogInUser("未ログイン");
    } else {
      const studentsDoc = await db
        .collection("Students")
        .doc(auth.currentUser.uid)
        .get();
      const studentsDataExists = studentsDoc.exists;

      const companiesDoc = await db
        .collection("Companies")
        .doc(auth.currentUser.uid)
        .get();
      const companiesDataExists = companiesDoc.exists;

      if (studentsDataExists === true) {
        setLogInUser("学生");
      } else if (companiesDataExists === true) {
        setLogInUser("企業");
      }
    }
  };

  useEffect(() => {
    checkExistWhichCollection();
  }, []);

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

            {auth.currentUser === null ? (
              <>
                <BUtton color="inherit" onClick={handleClickCompany}>
                  企業の方はこちら
                </BUtton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorElCompany}
                  keepMounted
                  open={Boolean(anchorElCompany)}
                  onClose={handleCloseCompany}
                >
                  <Link href="/auth/CompanySignIn">
                    <MenuItem onClick={handleCloseCompany}>ログイン</MenuItem>
                  </Link>
                  <Link href="/auth/CompanySignUp">
                    <MenuItem onClick={handleCloseCompany}>新規登録</MenuItem>
                  </Link>
                </Menu>
              </>
            ) : logInUser === "企業" ? (
              <>
                <BUtton color="inherit" onClick={handleClickCompany}>
                  企業の方はこちら
                </BUtton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorElCompany}
                  keepMounted
                  open={Boolean(anchorElCompany)}
                  onClose={handleCloseCompany}
                >
                  <Link
                    href={{
                      pathname: "individual-pages/company/[company]",
                      query: { company: auth.currentUser.uid },
                    }}
                  >
                    <MenuItem onClick={handleCloseCompany}>
                      企業様マイページへ
                    </MenuItem>
                  </Link>
                </Menu>
              </>
            ) : (
              ""
            )}

            {auth.currentUser === null ? (
              <>
                <BUtton color="inherit" onClick={handleClickStudent}>
                  学生の方はこちら
                </BUtton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorElStudent}
                  keepMounted
                  open={Boolean(anchorElStudent)}
                  onClose={handleCloseStudent}
                >
                  <Link href="/auth/StudentSignIn">
                    <MenuItem onClick={handleCloseStudent}>ログイン</MenuItem>
                  </Link>
                  <Link href="/auth/StudentSignUp">
                    <MenuItem onClick={handleCloseStudent}>新規登録</MenuItem>
                  </Link>
                </Menu>
              </>
            ) : logInUser === "学生" ? (
              <>
                <BUtton color="inherit" onClick={handleClickStudent}>
                  学生の方はこちら
                </BUtton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorElStudent}
                  keepMounted
                  open={Boolean(anchorElStudent)}
                  onClose={handleCloseStudent}
                >
                  <Link
                    href={{
                      pathname: "individual-pages/student/[student]",
                      query: { student: auth.currentUser.uid },
                    }}
                  >
                    <MenuItem onClick={handleCloseStudent}>
                      学生用マイページ
                    </MenuItem>
                  </Link>
                </Menu>
              </>
            ) : (
              ""
            )}
          </HEaderRight>
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
  z-index: 99;
`;

const HEaderRight = styled.div`
  margin: 0 0 0 auto;
`;

const BUtton = styled(Button)`
  background: (0, 0%, 61.96%);
  font-size: 18px;
  justify-content: right;
`;
