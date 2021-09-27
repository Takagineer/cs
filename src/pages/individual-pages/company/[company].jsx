import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Link from "next/Link";
import { db, signOut } from "../../../firebase";
import App from "../../../components/App";
import styled from "styled-components";
import Loading from "../../Loading";
import { Button } from "@material-ui/core";

export default function company() {
  const router = useRouter();
  const isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState();

  const getCompanyInformation = async () => {
    const info = await db
      .collection("Companies")
      .doc(router.query.company)
      .get();
    setCompanyInfo(info.data());
  };

  useEffect(() => {
    if (isReady) {
      setLoading(true);
      getCompanyInformation();
    }
  }, [isReady]);

  if (!loading) {
    return <Loading />;
  }

  const editCompanyInformation = () => {
    console.log("登録情報を編集します");
  };

  return (
    <>
      <App>
        <COntainer>
          <table border="3" bordercolor="green" width="50%" height="200px">
            <thead>
              <tr>
                <th colSpan="2">会社概要</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TD>会社名</TD>
                {companyInfo === undefined ? (
                  "抽出中"
                ) : (
                  <TD>{`${companyInfo.companyName}`}</TD>
                )}
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

          <br />
          <br />
          <Link href="/individual-pages/CompanyBusinesses">
            <Button variant="contained" color="primary">
              業務募集
            </Button>
          </Link>
          <br />
          <br />
          <br />
          <Link href="#">
            <Button
              variant="contained"
              color="primary"
              onClick={editCompanyInformation}
            >
              登録情報編変更
            </Button>
          </Link>
          <br />
          <br />
          <br />
          <Link href="/">
            <Button variant="contained" color="primary" onClick={signOut}>
              ログアウト
            </Button>
          </Link>
        </COntainer>
      </App>
    </>
  );
}
const COntainer = styled.div`
  padding: 100px 0 100px 50px;
`;

const TD = styled.td`
  white-space: nowrap;
  text-align: center;
`;
