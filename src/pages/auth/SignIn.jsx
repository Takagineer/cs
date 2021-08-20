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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async (e) => {
    const user = await signUpWithEmailAndPassword(email, password);
    setEmail("");
    setPassword("");
  };

  const signIn = async (e) => {
    const user = await signInWithEmailAndPassword(email, password);
    setEmail("");
    setPassword("");
  };

  const emailValue = (e) => {
    setEmail(e.target.value);
  };

  const passwordValue = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <App>
        <h1>情報登録</h1>
        <Container component="main" maxWidth="xs">
          <div>
            <Typography component="h1" variant="h5">
              新規登録
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
              value={email}
              onChange={emailValue}
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
              value={password}
              onChange={passwordValue}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={signUp}
            >
              Sign In
            </Button>
          </div>
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
              value={email}
              onChange={emailValue}
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
              value={password}
              onChange={passwordValue}
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
