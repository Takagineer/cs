import { useRouter } from "next/dist/client/router";
import React from "react";
import Link from "next/Link";
import { signOut } from "../../../firebase";
import App from "../../../components/App";
import styled from "styled-components";

export default function company() {
  const router = useRouter();
  return (
    <>
      <App>
        <COntainer>
          <h1>会社用のダイナミックルーティング用のファイル</h1>
          <h1>ようこそ{router.query.company}さん</h1>
          <p>企業用のトップページです</p>
          <table border="3" bordercolor="green" width="50%" height="200px">
            <thead>
              <tr>
                <th colSpan="2">会社概要</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>会社名</td>
                <td>◯◯株式会社</td>
              </tr>
              <tr>
                <td>設立</td>
                <td>△△年</td>
              </tr>
              <tr>
                <td>企業から一言</td>
                <td>弊社は〜〜〜</td>
              </tr>
            </tbody>
          </table>

          <p>募集中の業務一覧(複数あることも想定)</p>
          <table border="3" bordercolor="green" width="60%" height="200px">
            <thead>
              <tr>
                <th>業務内容</th>
                <th>配属場所</th>
                <th>想定報酬</th>
                <th>募集人数</th>
                <th>募集状況</th>
                <th>勤務形態</th>
                <th>応募状況</th>
                <th>応募者</th>
                <th>ステータス</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>営業補佐</th>
                <th>東京</th>
                <th>100,000/月</th>
                <th>５人</th>
                <th>何割</th>
                <th>リモート可能</th>
                <th>10人の応募</th>
                <th>
                  <Link href="#">
                    <a>応募者一覧へ</a>
                  </Link>
                </th>
                <th>応募中</th>
              </tr>
              <tr>
                <th>会計関連</th>
                <th>東京</th>
                <th>100,000/月</th>
                <th>3人</th>
                <th>5割</th>
                <th>リモート不可</th>
                <th>５人応募</th>
                <th>
                  <Link href="#">
                    <a>応募者一覧へ</a>
                  </Link>
                </th>
                <th>応募中</th>
              </tr>
            </tbody>
          </table>

          <p>過去の募集業務一覧(複数あることも想定)</p>
          <table border="3" bordercolor="green" width="70%" height="200px">
            <thead>
              <tr>
                <th>業務内容</th>
                <th>配属場所</th>
                <th>想定報酬</th>
                <th>募集人数</th>
                <th>募集状況</th>
                <th>勤務形態</th>
                <th>応募状況</th>
                <th>応募者</th>
                <th>ステータス</th>
                <th>評価</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>営業補佐</th>
                <th>大阪</th>
                <th>50,000/月</th>
                <th>6人</th>
                <th>8割</th>
                <th>リモート可能</th>
                <th>10人の応募</th>
                <th>
                  <Link href="#">
                    <a>応募者一覧へ</a>
                  </Link>
                </th>
                <th>締め切り済み</th>
                <th>星の評価機能をつける</th>
              </tr>
              <tr>
                <th>経理補佐</th>
                <th>東京</th>
                <th>100,000/月</th>
                <th>5人</th>
                <th>9割</th>
                <th>リモート不可</th>
                <th>５人応募</th>
                <th>
                  <Link href="#">
                    <a>応募者一覧へ</a>
                  </Link>
                </th>
                <th>締め切り済み</th>
                <th>星の評価機能をつける</th>
              </tr>
            </tbody>
          </table>

          <p>業務募集機能の実装</p>
          <p>会社情報編集</p>
          <p>
            生徒の検索機能（あくまで情報のみ）
            <br />
            生徒が過去に応募した業種の、タグを知ることができ、傾向がわかる。
          </p>
          <p>タグでの分析機能</p>
          <br />
          <br />
          <br />
          <br />
          <Link href="/individual-pages/CompanyBusinesses">
            <button>業務募集ページへ</button>
          </Link>
          <br />
          <Link href="/">
            <button onClick={signOut}>ログアウト</button>
          </Link>
        </COntainer>
      </App>
    </>
  );
}
const COntainer = styled.div`
  padding: 100px 0 100px 50px;
`;
