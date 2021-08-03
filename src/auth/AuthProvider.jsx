import React, { useState, useEffect } from 'react'
import { createContext } from 'react'
import firebase, { auth } from '../../firebase';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password, history) => {
    try {
      await auth.signInWithEmailAndPassWord(email, password)
      history.push("/")
    } catch (error) {
      alert(error)
    }
  }
  //ユーザーをログインさせるための関数


  const signup = async (email, password, history) => {
    try {
      await auth.createUserWithEmailAndPassWord(email, password)
      history.push("/")
    } catch (error) {
      alert(error)
    }
  }
  //新しいユーザーを作成し、ログインさせるための関数

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser)
  }, [])

  return (

    <AuthContext.Provider
      value={{
        login: login,
        signup: signup,
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>

  )

}