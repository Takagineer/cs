import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// 新規登録の実装
export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const user = firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    alert("登録成功");
    return user;
    console.log(user);
  } catch (error) {
    alert("errorですよ");
    console.log(error);
  }
};
// 新規登録の実装

//ログイン機能の実装
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    await firebase.auth().currentUser.sendEmailVerification;

    alert("サインイン成功");
    return user;
  } catch (error) {
    alert("サインイン失敗");
    console.log(error);
  }
};
//ログイン機能の実装

// ログアウト機能の実装
export const signOut = async () => {
  const user1 = await firebase.auth().currentUser;
  console.log("サインアウト前:", user1);

  await firebase.auth().signOut();

  const user2 = await firebase.auth().currentUser;
  console.log("サインアウト後:", user2);
};
// ログアウト機能の実装

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
