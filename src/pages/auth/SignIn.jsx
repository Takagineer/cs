import Link from 'next/link'
import React, { useState } from 'react'
import App from '../../components/App'
import {signUpWithEmailAndPassword,signInWithEmailAndPassword,signOut} from '../../firebase'
import {auth} from '../../firebase'


export default function Login() {
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')

  const signUp = async(e)=>{
    const user = await signUpWithEmailAndPassword(email,password)
    setEmail('')
    setPassword('')
  }

  const signIn = async(e)=>{
    const user = await signInWithEmailAndPassword(email,password)
    setEmail('')
    setPassword('')
  }

  const emailValue =(e)=>{
    setEmail(e.target.value)
  }

  const passwordValue =(e)=>{
    setPassword(e.target.value)
  }

  return (
    <>
    <App>
      <h1>情報登録</h1>
      <h2>新規登録</h2>
        <input value={email} placeholder="Email" onChange={emailValue}/>

        <input type="password" value={password}  placeholder="Password" onChange={passwordValue}/>
        <button type="submit" onClick={signUp}>登録</button>

      <h2>ログイン</h2>
        <input value={email} placeholder="Email" onChange={emailValue}/>

        <input type="password" value={password}  placeholder="Password" onChange={passwordValue}/>
        <button type="submit" onClick={signIn}>ログイン</button>

        <br />
      <button onClick={signOut}>ログアウト</button>

      <Link href="/">
        <button>トップページへ</button>
      </Link>

    </App>
    </>
  )
}