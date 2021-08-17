import { makeStyles, TextField } from "@material-ui/core";
import Link from "next/link";
import React, { useState } from "react";
import App from "../../components/App";
import { db } from "../../firebase";
import firebase from "firebase/app";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function CompanyBusinesses() {
  const [businessSubject, setBusinessSubject] = useState("");
  const [businessDetail, setBusinessDetail] = useState("");
  const [reward, setReward] = useState("");
  const [number, setNumber] = useState("");
  const [period, setPeriod] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [message, setMessage] = useState("");

  const classes = useStyles();

  const clickAddButton = async () => {
    if (
      !businessSubject ||
      !businessDetail ||
      !reward ||
      !number ||
      !period ||
      !location ||
      !skill ||
      !message
    ) {
      return alert("空欄があります");
    }

    const parsedReward = parseInt(reward, 10);
    if (isNaN(parsedReward)) {
      alert("想定報酬額は半角数字で入力してだくさい");
      return;
    }
    const parsedNumber = parseInt(number, 10);
    if (isNaN(parsedNumber)) {
      alert("募集人数は半角数字で入力してだくさい");
      return;
    }
    const parsedPeriod = parseInt(period, 10);
    if (isNaN(parsedPeriod)) {
      alert("想定期間は半角数字で入力してだくさい");
      return;
    }
    console.log("保存します");
    try {
      await firebase.firestore().collection("businesses").add({
        businessSubject: businessSubject,
        businessDetail: businessDetail,
        reward: parsedReward,
        number: parsedNumber,
        period: parsedPeriod,
        location: location,
        skill: skill,
        message: message,
      });
    } catch (error) {
      console.log(error);
    }

    const business = await firebase.firestore().collection("users").get();
    console.log(business);

    // await db.collection('businesses').add({
    //   businessSubject:businessSubject,
    //   businessDetail:businessDetail,
    //   reward:parsedReward,
    //   number:parsedNumber,
    //   period:parsedPeriod,
    //   location:location,
    //   skill:skill,
    //   message:message
    // })

    setBusinessSubject("");
    setBusinessDetail("");
    setReward("");
    setNumber("");
    setPeriod("");
    setLocation("");
    setSkill("");
    setMessage("");

    alert("保存しました");
  };
  return (
    <>
      <App>
        <h1>募集業務張り出し機能用のページです</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="募集業務"
            value={businessSubject}
            onChange={(e) => {
              setBusinessSubject(e.target.value);
            }}
          />
          <br />
          <TextField
            id="standard-basic"
            label="業務内容"
            value={businessDetail}
            onChange={(e) => {
              setBusinessDetail(e.target.value);
            }}
          />
          <br />
          <TextField
            id="standard-basic"
            label="想定報酬額"
            value={reward}
            onChange={(e) => {
              setReward(e.target.value);
            }}
          />
          <br />
          <TextField
            id="standard-basic"
            label="募集人数"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
          <br />
          <TextField
            id="standard-basic"
            label="想定期間"
            value={period}
            onChange={(e) => {
              setPeriod(e.target.value);
            }}
          />
          <br />
          <TextField
            id="standard-basic"
            label="勤務場所"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <br />
          <TextField
            id="standard-basic"
            label="必要なスキル"
            value={skill}
            onChange={(e) => {
              setSkill(e.target.value);
            }}
          />
          <br />
          <TextField
            id="standard-basic"
            label="メッセージ"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <br />
        </form>

        <button onClick={clickAddButton}>追加</button>
        <br />

        <Link href="/">
          <a>トップへ</a>
        </Link>
      </App>
    </>
  );
}
