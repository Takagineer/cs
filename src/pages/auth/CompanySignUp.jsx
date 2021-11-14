import { Button, Container, TextField } from "@material-ui/core";
import React, { useState } from "react";
import App from "../../components/App";
import { auth, db, signUpWithEmailAndPassword } from "../../firebase";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import Link from "next/link";
import company from "../individual-pages/company/[company]";

export default function CompanySignUp() {
  const [companySignUpEmail, setCompanySignUpEmail] = useState("");
  const [companySignUpPassword, setCompanySignUpPassword] = useState("");
  const [companySignUpCompanyName, setCompanySignUpCompanyName] = useState("");
  const [companySignUpPhoneNumber, setCompanySignUpPhoneNumber] = useState("");

  const companySignUpEmailValue = (e) => {
    setCompanySignUpEmail(e.target.value);
  };
  const companySignUpPasswordValue = (e) => {
    setCompanySignUpPassword(e.target.value);
  };
  const companySignUpCompanyNameValue = (e) => {
    setCompanySignUpCompanyName(e.target.value);
  };
  const companySignUpPhoneNumberValue = (e) => {
    setCompanySignUpPhoneNumber(e.target.value);
  };

  const companySignUp = async (e) => {
    const company = await signUpWithEmailAndPassword(
      companySignUpEmail,
      companySignUpPassword
    );
    const uid = auth.currentUser.uid;
    const companyInitialData = {
      email: companySignUpEmail,
      password: companySignUpPassword,
      companyName: companySignUpCompanyName,
      phoneNumber: companySignUpPhoneNumber,
    };
    await db.collection("Companies").doc(uid).set(companyInitialData);
    alert("登録しました");
    setCompanySignUpEmail("");
    setCompanySignUpPassword("");
    setCompanySignUpCompanyName("");
    setCompanySignUpPhoneNumber("");
  };
  return (
    <>
      <App>
        {auth.currentUser === null ? (
          <Container component="main" maxWidth="xs">
            <div>
              <br />
              <br />
              <br />
              <h1>企業様新規登録ページ</h1>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                autoFocus
                value={companySignUpEmail}
                onChange={companySignUpEmailValue}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                value={companySignUpPassword}
                onChange={companySignUpPasswordValue}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Company Name"
                value={companySignUpCompanyName}
                onChange={companySignUpCompanyNameValue}
              />
              <TextField
                type="tel"
                variant="outlined"
                margin="normal"
                fullWidth
                label="Phone Number"
                value={companySignUpPhoneNumber}
                onChange={companySignUpPhoneNumberValue}
              />
              <br />
              <br />
              <br />
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={companySignUp}
              >
                Sign Up
              </Button>
              <br />
              <br />
              <br />
            </div>
          </Container>
        ) : (
          <company />
        )}

        <br />
      </App>
    </>
  );
}
