import App from '../components/App'
import Link from 'next/link'
import PopularBusinesses from '../components/PopularBusinesses'
import RankingBusiness from '../components/RankingBusiness'
// import Login from '../components/auth/Login'

export default function Home() {
  return (
    // <AuthProvider>
    <App>
      {/* <NewBusinesses /> */}
      <PopularBusinesses />
      {/* <Login /> */}
      <RankingBusiness />
    </App>
    // </AuthProvider>
  )
}
