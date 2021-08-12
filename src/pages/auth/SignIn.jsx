import Link from 'next/link'
import React, { useState } from 'react'
import {signUpWithEmailAndPassword,signOut} from '../../firebase'


export default function Login() {
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')

  const signUp=async(e)=>{
    const user = await signUpWithEmailAndPassword(email,password)
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
      <h1>情報登録</h1>
      <h2>新規登録</h2>
        <label>
          Email
          <input value={email} placeholder="Email" onChange={emailValue}/>
        </label>

        <label>
          Password
          <input type="password" value={password}  placeholder="Password" onChange={passwordValue}/>
        </label>
        <button type="submit" onClick={signUp}>登録</button>
      <Link href="/">
        <button>トップページへ</button>
      </Link>

      <h2>ログイン</h2>
        <label>
          Email
          <input value={email} placeholder="Email" onChange={emailValue}/>
        </label>

        <label>
          Password
          <input type="password" value={password}  placeholder="Password" onChange={passwordValue}/>
        </label>
        <button type="submit" onClick={signUp}>登録</button>
      <Link href="/">
        <button>トップページへ</button>
      </Link>
        <br />
      <button onClick={signOut}>ログアウト</button>
      

    </>
  )
}