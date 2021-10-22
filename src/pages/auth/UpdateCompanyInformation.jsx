import React, { useState } from "react";
import App from "../../components/App";
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";
import { auth, db, updateEmail, updatePassword } from "../../firebase";

export default function UpdateCompanyInformation() {
  const [updateCompanyEmail, setUpdateCompanyEmail] = useState();
  const [updateCompanyPassword, setUpdateCompanyPassword] = useState();
  const [updateCompanyCompanyName, setUpdateCompanyCompanyName] = useState();
  const [updateCompanyPhoneNumber, setUpdateCompanyPhoneNumber] = useState();
  const updateCompanyEmailValue = (e) => setUpdateCompanyEmail(e.target.value);
  const updateCompanyPasswordValue = (e) =>
    setUpdateCompanyPassword(e.target.value);
  const updateCompanyCompanyNameValue = (e) =>
    setUpdateCompanyCompanyName(e.target.value);
  const updateCompanyPhoneNumberValue = (e) =>
    setUpdateCompanyPhoneNumber(e.target.value);

  const updateCompanyInformation = async () => {
    // await updateEmail(auth.currentUser, updateCompanyEmail);
    // await updatePassword(auth.currentUser, updateCompanyPassword);
    await db.collection("Companies").doc(auth.currentUser.uid).update({
      companyName: updateCompanyCompanyName,
      email: updateCompanyEmail,
      password: updateCompanyPassword,
      phoneNumber: updateCompanyPhoneNumber,
    });
    setUpdateCompanyEmail("");
    setUpdateCompanyPassword("");
    setUpdateCompanyCompanyName("");
    setUpdateCompanyPhoneNumber("");
    alert("更新しました");
  };

  return (
    <>
      <App>
        <COntainer>
          <br />
          <DIv>
            <h1>登録情報変更</h1>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="New Email Address"
              autoFocus
              value={updateCompanyEmail}
              onChange={updateCompanyEmailValue}
            />
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="New Password"
                type="password"
                value={updateCompanyPassword}
                onChange={updateCompanyPasswordValue}
              />
            </form>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="New Company Name"
              value={updateCompanyCompanyName}
              onChange={updateCompanyCompanyNameValue}
            />
            <TextField
              type="tel"
              variant="outlined"
              margin="normal"
              fullWidth
              label="New Phone Number"
              value={updateCompanyPhoneNumber}
              onChange={updateCompanyPhoneNumberValue}
            />
            <br />
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={updateCompanyInformation}
            >
              更新
            </Button>
          </DIv>
          <br />
          <br />
          <br />
        </COntainer>
      </App>
    </>
  );
}

const COntainer = styled.div`
  padding: 100px 0 100px 50px;
`;

const DIv = styled.div`
  width: 40%;
  margin: 20px auto;
`;
