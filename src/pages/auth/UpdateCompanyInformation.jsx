import React from "react";
import App from "../../components/App";
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";

export default function UpdateCompanyInformation() {
  return (
    <>
      {/* <App>
        <COntainer>
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
        </COntainer>
      </App> */}
    </>
  );
}

const COntainer = styled.div`
  padding: 100px 0 100px 50px;
`;
