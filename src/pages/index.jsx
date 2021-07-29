import App from '../components/App'
import Link from 'next/link'
import NewBusinesses from '../components/NewBusinesses'
import PopularBusinesses from '../components/PopularBusinesses'
import RankingBusiness from '../components/RankingBusiness'

export default function Home() {
  return (
    <App>
      <NewBusinesses />
      <PopularBusinesses />
      <RankingBusiness />
    </App>
  )
}
