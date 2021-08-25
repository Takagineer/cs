import App from "../components/App";
import Link from "next/link";
import PopularBusinesses from "../components/PopularBusinesses";
import RankingBusiness from "../components/RankingBusiness";

export default function Home() {
  return (
    // <AuthProvider>
    <App>
      <PopularBusinesses />
      <RankingBusiness />
    </App>
    // </AuthProvider>
  );
}
