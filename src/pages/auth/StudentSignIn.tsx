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
import student from "../individual-pages/student/[student]";

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
        <COntainer component="main" maxWidth="xs">
          <br />
          <br />
          <br />
          <br />
          <h1>学生様用ログインページ</h1>
          <form>
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
          </form>
          <br />
          <br />
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={signIn}
          >
            Sign In
          </Button>
          <br />
          <br />
          <br />
        </COntainer>
      </App>
    </>
  );
}

const COntainer = styled(Container)`
  height: 0%;
`;
