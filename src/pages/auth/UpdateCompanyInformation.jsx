import React, { useState } from "react";
import App from "../../components/App";
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";
import { auth, db } from "../../firebase";
import router from "next/router";

export default function UpdateCompanyInformation() {
  const [updateCompanyCompanyName, setUpdateCompanyCompanyName] = useState();
  const [updateCompanyPhoneNumber, setUpdateCompanyPhoneNumber] = useState();
  const updateCompanyCompanyNameValue = (e) =>
    setUpdateCompanyCompanyName(e.target.value);
  const updateCompanyPhoneNumberValue = (e) =>
    setUpdateCompanyPhoneNumber(e.target.value);

  const updateCompanyInformation = async () => {
    await db.collection("Companies").doc(auth.currentUser.uid).set(
      {
        companyName: updateCompanyCompanyName,
        phoneNumber: updateCompanyPhoneNumber,
      },
      { merge: true }
    );
    alert("更新しました");
    await router.push(`/individual-pages/company/${auth.currentUser.uid}`);
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
