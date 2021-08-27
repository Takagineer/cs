import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  TextField,
  Container,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import App from "../../components/App";
import {
  signUpWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  auth,
} from "../../firebase";
import styled from "styled-components";
import Student from "../individual-pages/Student";

export default function Login() {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const signIn = async (e) => {
    const user = await signInWithEmailAndPassword(signInEmail, signInPassword);
    setSignInEmail("");
    setSignInPassword("");
  };

  const signInEmailValue = (e) => {
    setSignInEmail(e.target.value);
  };

  const signInPasswordValue = (e) => {
    setSignInPassword(e.target.value);
  };

  return (
    <>
      <App>
        {auth.currentUser === null ? (
          <Container component="main" maxWidth="xs">
            <h1>情報登録</h1>
            <div></div>
            <div>
              <Typography component="h1" variant="h5">
                ログイン
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={signInEmail}
                onChange={signInEmailValue}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={signInPassword}
                onChange={signInPasswordValue}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={signIn}
              >
                Sign In
              </Button>
            </div>
          </Container>
        ) : (
          <Student />
        )}

        <Button variant="contained" color="primary" onClick={signOut}>
          ログアウト
        </Button>
        {"    "}
        <Link href="/">
          <Button variant="contained" color="primary" onClick={signOut}>
            トップページへ
          </Button>
        </Link>
      </App>
    </>
  );
}
