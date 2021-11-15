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
import company from "../individual-pages/company/[company]";

export default function Login() {
  const [companySignInEmail, setCompanySignInEmail] = useState("");
  const [companySignInPassword, setCompanySignInPassword] = useState("");

  const companySignIn = async (e) => {
    const user = await signInWithEmailAndPassword(
      companySignInEmail,
      companySignInPassword
    );
    setCompanySignInEmail("");
    setCompanySignInPassword("");
  };

  const companySignInEmailValue = (e) => {
    setCompanySignInEmail(e.target.value);
  };

  const companySignInPasswordValue = (e) => {
    setCompanySignInPassword(e.target.value);
  };

  return (
    <>
      <App>
        <Container component="main" maxWidth="xs">
          <br />
          <br />
          <br />
          <br />
          <h1>企業様用ログインページ</h1>
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
            value={companySignInEmail}
            onChange={companySignInEmailValue}
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
            value={companySignInPassword}
            onChange={companySignInPasswordValue}
          />
          <br />
          <br />
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={companySignIn}
          >
            Sign In
          </Button>
        </Container>

        <br />
        <br />
        <br />
      </App>
    </>
  );
}
