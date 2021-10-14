import App from "../components/App";
import Link from "next/link";
import Head from "next/Head";
import PopularBusinesses from "../components/PopularBusinesses";
import Filter from "../components/Filetr";
import RankingBusiness from "../components/NewBusiness";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    // <AuthProvider>
    <RecoilRoot>
      <App>
        <Head>
          <title>トップページ</title>
        </Head>
        <PopularBusinesses />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Filter />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </App>
    </RecoilRoot>
    // </AuthProvider>
  );
}
