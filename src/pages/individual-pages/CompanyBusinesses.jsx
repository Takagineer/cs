import { makeStyles, TextField } from '@material-ui/core';
import Link from 'next/link';
import React from 'react'
import App from '../../components/App';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export default function CompanyBusinesses() {
  const classes = useStyles();
  return (
    <>
    <App>
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
    <button>追加</button>
    <br />

    <Link href="/">
    <a>トップへ</a>
    </Link>
    </App>
    </>
  )
}