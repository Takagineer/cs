import firebase from "firebase/app";
// import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
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

export const auth = firebase.auth();
// export const db = firebase.firestore();
export default firebase;
