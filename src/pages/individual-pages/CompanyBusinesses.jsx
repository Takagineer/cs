import { makeStyles, TextField } from "@material-ui/core";
import Link from "next/link";
import React from "react";
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
  const addBusinessData = async () => {
    console.log("保存します");
    await db.collection("Businesses").doc("1").set({ name: "test", age: 10 });
    console.log("保存しました");
  };

  const classes = useStyles();
  return (
    <>
      <App>
        <br />
        <br />
        <h1>募集業務張り出し機能用のページです</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="募集業務" />
          <br />
          <TextField id="standard-basic" label="業務内容" />
          <br />
          <TextField id="standard-basic" label="想定報酬額" />
          <br />
          <TextField id="standard-basic" label="募集人数" />
          <br />
          <TextField id="standard-basic" label="勤務場所" />
          <br />
          <TextField id="standard-basic" label="必要なスキル" />
          <br />
          <TextField id="standard-basic" label="メッセージ" />

          <br />
        </form>
        <button onClick={addBusinessData}>追加</button>
        <br />

        <Link href="/">
          <a>トップへ</a>
        </Link>
      </App>
    </>
  );
}
