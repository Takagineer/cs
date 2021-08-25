import App from "../components/App";
import Link from "next/link";
import PopularBusinesses from "../components/PopularBusinesses";
import RankingBusiness from "../components/RankingBusiness";
import Filetr from "../components/Filetr";

export default function Home() {
  return (
    // <AuthProvider>
    <App>
      <PopularBusinesses />
      <Filetr />
      <RankingBusiness />
    </App>
    // </AuthProvider>
  );
}
