import App from "../components/App";
import Link from "next/link";
import Head from "next/head";
import PopularBusinesses from "../components/PopularBusinesses";
import Filter from "../components/Filetr";
import RankingBusiness from "../components/NewBusiness";

export default function Home() {
  return (
    <App>
      <Head>
        <title>トップページ</title>
      </Head>
      <PopularBusinesses />
      <Filter />
    </App>
  );
}
