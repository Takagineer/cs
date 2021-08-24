import { Button, makeStyles, TextField } from "@material-ui/core";
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
    // documentの取得;
    console.log("保存します");
    await db.collection("Businesses").add({
      business: business,
      detail: detail,
      reward: reward,
      number: number,
      location: location,
      skill: skill,
      message: message,
    });
    console.log("保存しました");
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
        <br />
        <br />
        <br />
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="募集業務"
            value={business}
            onChange={businessValue}
          />
          <br />
          <TextField
            id="standard-basic"
            label="業務内容"
            value={detail}
            onChange={detailValue}
          />
          <br />
          <TextField
            id="standard-basic"
            label="想定報酬額"
            value={reward}
            onChange={rewardValue}
          />
          <br />
          <TextField
            id="standard-basic"
            label="募集人数"
            value={number}
            onChange={numberValue}
          />
          <br />
          <TextField
            id="standard-basic"
            label="勤務場所"
            value={location}
            onChange={locationValue}
          />
          <br />
          <TextField
            id="standard-basic"
            label="必要なスキル"
            value={skill}
            onChange={skillValue}
          />
          <br />
          <TextField
            id="standard-basic"
            label="メッセージ"
            value={message}
            onChange={messageValue}
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
      </App>
    </>
  );
}
