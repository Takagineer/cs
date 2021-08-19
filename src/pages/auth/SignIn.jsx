import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import { Container, CssBaseline, Typography } from "@material-ui/core";
import Link from "next/link";
import React, { useState } from "react";
import App from "../../components/App";
import {
  signUpWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  auth,
} from "../../firebase";

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
          <CssBaseline />
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
        </Container>
        <h2>ログイン</h2>
        <input value={email} placeholder="Email" onChange={emailValue} />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={passwordValue}
        />
        <button type="submit" onClick={signIn}>
          ログイン
        </button>
        <br />
        <button onClick={signOut}>ログアウト</button>
        <Link href="/">
          <button>トップページへ</button>
        </Link>
      </App>
    </>
  );
}
