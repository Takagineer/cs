import { Button, Container, TextField, Typography } from "@material-ui/core";
import Link from "next/link";
import React, { useState } from "react";
import App from "../../components/App";
import { signOut, signUpWithEmailAndPassword } from "../../firebase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailValue = (e) => {
    setEmail(e.target.value);
  };

  const passwordValue = (e) => {
    setPassword(e.target.value);
  };

  const signUp = async (e) => {
    const user = await signUpWithEmailAndPassword(email, password);
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <App>
        <h1>新規登録画面</h1>
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
