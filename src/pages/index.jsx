import App from "../components/App";
import Link from "next/link";
import PopularBusinesses from "../components/PopularBusinesses";
import RankingBusiness from "../components/RankingBusiness";
import { db } from "../firebase";
// import Login from '../components/auth/Login'

export default function Home() {
  db.collection("users").add({
    name: "hoge",
  });
  return (
    // <AuthProvider>
    <App>
      {/* <NewBusinesses /> */}
      <PopularBusinesses />
      {/* <Login /> */}
      <RankingBusiness />
    </App>
    // </AuthProvider>
  );
}
