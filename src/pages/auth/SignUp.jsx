import { Button, Container, TextField, Typography } from "@material-ui/core";
import Link from "next/link";
import React, { useState } from "react";
import App from "../../components/App";
import { auth, db, signOut, signUpWithEmailAndPassword } from "../../firebase";

export default function SignUp() {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpUserAge, setSignUpUserAge] = useState("");
  const [signUpUserLocation, setSignUpUserLocation] = useState("");

  const signUpEmailValue = (e) => {
    setSignUpEmail(e.target.value);
  };

  const signUpPasswordValue = (e) => {
    setSignUpPassword(e.target.value);
  };
  const signUpUserNameValue = (e) => {
    setSignUpUserName(e.target.value);
  };
  const signUpUserAgeValue = (e) => {
    setSignUpUserAge(e.target.value);
  };
  const signUpUserLocationValue = (e) => {
    setSignUpUserLocation(e.target.value);
  };

  const signUp = async (e) => {
    const user = await signUpWithEmailAndPassword(signUpEmail, signUpPassword);

    const uid = auth.currentUser.uid;
    const userInitialData = {
      email: signUpEmail,
      password: signUpPassword,
      userName: signUpUserName,
      age: signUpUserAge,
      location: signUpUserLocation,
    };
    await db.collection("users").doc(uid).set(userInitialData);
    alert("登録しました");
    setSignUpEmail("");
    setSignUpPassword("");
    setSignUpUserName("");
    setSignUpUserAge("");
    setSignUpUserLocation("");
  };
  return (
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
            value={signUpEmail}
            onChange={signUpEmailValue}
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
            value={signUpPassword}
            onChange={signUpPasswordValue}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="ユーザー名"
            name="email"
            autoComplete="email"
            autoFocus
            value={signUpUserName}
            onChange={signUpUserNameValue}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="年齢"
            name="email"
            autoComplete="email"
            autoFocus
            value={signUpUserAge}
            onChange={signUpUserAgeValue}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="出身地"
            name="email"
            autoComplete="email"
            autoFocus
            value={signUpUserLocation}
            onChange={signUpUserLocationValue}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={signUp}
          >
            Sign Up
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
  );
}
