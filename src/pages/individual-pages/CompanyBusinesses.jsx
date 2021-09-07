import { Container, Button, makeStyles, TextField } from "@material-ui/core";
import Link from "next/link";
import React, { useState } from "react";
import App from "../../components/App";
import { db } from "../../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function CompanyBusinesses() {
  const [business, setBusiness] = useState("");
  const [detail, setDetail] = useState("");
  const [reward, setReward] = useState("");
  const [number, setNumber] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [message, setMessage] = useState("");

  const addBusinessData = async () => {
    if (
      !business ||
      !detail ||
      !reward ||
      !number ||
      !location ||
      !skill ||
      !message
    ) {
      alert("空欄を埋めてください");
      return;
    }
    await db.collection("Businesses").add({
      business: business,
      detail: detail,
      reward: reward,
      number: number,
      location: location,
      skill: skill,
      message: message,
    });
    alert("募集しました");
    setBusiness("");
    setDetail("");
    setReward("");
    setNumber("");
    setLocation("");
    setSkill("");
    setMessage("");
    //コレクションに紐づいたデータの取得
    // const snapshot = await db
    //   .collection("Businesses")
    //   .where("age", "<=", 30)
    //   .get();
    // snapshot.forEach((doc) => {
    //   console.log(doc.id, "=>", doc.data());
    // });
  };

  const businessValue = (e) => {
    setBusiness(e.target.value);
  };
  const detailValue = (e) => {
    setDetail(e.target.value);
  };
  const rewardValue = (e) => {
    setReward(e.target.value);
  };
  const numberValue = (e) => {
    setNumber(e.target.value);
  };
  const locationValue = (e) => {
    setLocation(e.target.value);
  };
  const skillValue = (e) => {
    setSkill(e.target.value);
  };
  const messageValue = (e) => {
    setMessage(e.target.value);
  };
  const classes = useStyles();
  return (
    <>
      <App>
        <Container component="main" maxWidth="xs">
          <br />
          <br />
          <br />
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="募集業務"
              autoFocus
              value={business}
              onChange={businessValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="業務内容"
              autoFocus
              value={detail}
              onChange={detailValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="想定報酬額"
              autoFocus
              value={reward}
              onChange={rewardValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="募集人数"
              autoFocus
              value={number}
              onChange={numberValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="勤務場所"
              autoFocus
              value={location}
              onChange={locationValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="メッセージ"
              autoFocus
              multiline
              rows="5"
              value={message}
              onChange={messageValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="必要なスキル"
              autoFocus
              value={skill}
              onChange={skillValue}
            />

            <br />
          </form>

          <br />
          <br />
          <Button variant="contained" color="primary" onClick={addBusinessData}>
            追加
          </Button>
          <br />
          <br />
          <Link href="/">
            <Button variant="contained" color="secondary">
              トップページへ
            </Button>
          </Link>
        </Container>
      </App>
    </>
  );
}
