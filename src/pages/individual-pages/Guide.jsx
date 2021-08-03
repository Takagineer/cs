import React from 'react'
import styled from 'styled-components'
import App from '../../components/App'


export default function Guide() {
  return (
    <App>

      <COntainer>
        <p>ガイド用のページです</p>
        <p>このは、企業で働く従業員の方々と、大学生とをう結びつける出会いの場所です。</p>
        <p>このサイトが皆様方の良き出会いの場所となることを祈っています。</p>
        <h2>企業のみなさまへ</h2>
        <ul>
          <li>このサイトでは、皆様の業務を一部学生の皆様へ割り当てることにより、従業員の方々の負担を減らし、より難易度の高い業務へ集中することができます。</li>
          <li>ある程度の業務をこなすことによって、入社した後の研修期間を短くすることができます。</li>
          <li></li>
        </ul>
        <h2>学生のみなさまへ</h2>
      </COntainer>
    </App>
  )
}

const COntainer = styled.div`
padding:100px 0 100px 50px;
`

