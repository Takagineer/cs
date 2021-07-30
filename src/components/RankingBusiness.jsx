import React from 'react'
import styled from 'styled-components'

export default function RankingBusiness() {
  return (
    <>
      <COntainer>
        <p>保有しているステータスによって振り分け流機能。ボタンを押すと表示内容が変わる。</p>
      </COntainer>
    </>
  )
}

const COntainer = styled.div`
background-color:#e4dc8a;
height:300px;
padding:100px 0 0 40px;
`