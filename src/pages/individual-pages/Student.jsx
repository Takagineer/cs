import React from 'react'
import App from '../../components/App'

export default function Student() {
  return (
    <App>
      <p>学生用のトップページです</p>
      <table>
        <tr>
          <th>学生紹介</th>
        </tr>
      </table>

      <table border="3" bordercolor="green" width="50%" height="200px">
        <thead>
          <tr>
            <th colSpan="2">学生概要</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>氏名</td>
            <td>◯◯△△</td>
          </tr>
          <tr>
            <td>大学</td>
            <td>××大学</td>
          </tr>
          <tr>
            <td>年次</td>
            <td>３年生</td>
          </tr>
          <tr>
            <td>アピール</td>
            <td>私は、全日本柔道選手権大会３連覇しております。</td>
          </tr>
        </tbody>
      </table>

      <p>検索機能の実装</p>
      <p>生徒情報編集機能の実装</p>
    </App>
  )
}
