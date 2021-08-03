import React from 'react'
import styled from 'styled-components'

export default function PopularBusinesses() {
  return (
    <>
      <COntainer>
        <p>フィルターを実装。項目によって表示する内容を変える。</p>
        <p>人気業務一覧</p>
        <p>新着業務一覧の表示 </p>
        <div>ページネーションで画像を横に貼り付ける</div>
        <div>画像</div>
        <div>会社名</div>
        <div>報酬</div>
        <div>星評価（会社の過去の業務等から）</div>
        <div>いいね数</div>
      </COntainer>
    </>
  )
}

const COntainer = styled.div`
background-color:#e0ebaf;
height:300px;
padding:100px 0 0 40px;
`