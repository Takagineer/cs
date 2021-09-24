import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import App from "../../../components/App";
import { db, signOut } from "../../../firebase";
import styled from "styled-components";
import Link from "next/Link";
import { Button } from "@material-ui/core";
import { info } from "firebase-functions/lib/logger";
import Loading from "../../Loading";

export default function student() {
  const router = useRouter();
  const isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState();

  const getStudentInformation = async () => {
    const info = await db
      .collection("Students")
      .doc(router.query.student)
      .get();
    setStudentInfo(info.data());
  };

  useEffect(() => {
    if (isReady) {
      setLoading(true);
      getStudentInformation();
    }
  }, [isReady]);

  if (!loading) {
    return <Loading />;
  }

  const editStudentInformation = () => {
    console.log("登録情報の編集をします");
  };
  return (
    <App>
      <COntainer>
        <button onClick={getStudentInformation}>データ抽出</button>
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
              {studentInfo === undefined ? (
                "抽出中"
              ) : (
                <td>{`${studentInfo.firstName} ${studentInfo.lastName}さん`}</td>
              )}
            </tr>
            <tr>
              <td>大学</td>
              {studentInfo === undefined ? (
                "抽出中"
              ) : (
                <td>{`${studentInfo.university}`}</td>
              )}
            </tr>
            <tr>
              <td>年次</td>
              {studentInfo === undefined ? (
                "抽出中"
              ) : (
                <td>{`${studentInfo.age}`}</td>
              )}
            </tr>
            <tr>
              <td>アピール</td>
              {studentInfo === undefined ? (
                "抽出中"
              ) : (
                <td>{`${studentInfo.introduction}`}</td>
              )}
            </tr>
          </tbody>
        </table>

        <p>
          検索機能の実装（タグで実装？）
          <br />
          これで表示させて応募もできる
        </p>
        <p>生徒情報編集機能の実装</p>

        <Link href="#">
          <Button
            variant="contained"
            color="primary"
            onClick={editStudentInformation}
          >
            登録情報編集
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
  );
}
const COntainer = styled.div`
  padding: 100px 0 100px 50px;
`;
