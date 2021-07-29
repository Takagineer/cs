import App from '../components/App'
import Link from 'next/link'

export default function Home() {
  return (
    <App>
      <p>新着業務一覧(ただし、横に自動でスクロールされるだけ)</p>
      <p>人気業務一覧(横にスクロールさせる)</p>
      <p>保有しているステータスによって振り分け流機能。ボタンを押すと表示内容が変わる。</p>
    </App>
  )
}
