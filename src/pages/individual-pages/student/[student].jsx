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
    console.log("確認用");
    setStudentInfo(info.data());
    console.log("関数内なので出力されない");
  };

  useEffect(() => {
    console.log("useEffectのstateの値");
    console.log(studentInfo);
    setStudentInfo(studentInfo);
    // console.log("studentInfoが出力");
    // console.log(studentInfo);
  }, [studentInfo]);

  useEffect(() => {
    if (isReady) {
      setLoading(true);
      getStudentInformation();
      console.log("isReady:初回レンダリング");
    }
  }, [isReady]);

  if (!loading) {
    return <Loading />;
  }

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
                <td>{studentInfo.email}</td>
              )}
              {/* <td>{studentInfo.email}</td> */}
            </tr>
            <tr>
              <td>大学</td>
              <td>{"ここに大学を記述する"}</td>
            </tr>
            <tr>
              <td>年次</td>
              <td>{"ここに年次を記述"}</td>
            </tr>
            <tr>
              <td>アピール</td>
              <td>{"ここにアピールを記述する"}</td>
            </tr>
          </tbody>
        </table>

        <p>
          検索機能の実装（タグで実装？）
          <br />
          これで表示させて応募もできる
        </p>
        <p>生徒情報編集機能の実装</p>

        {/* <ul>
          {studentInfo.map((studentInfo) => {
            return (
              <li key={studentInfo.studentId}>氏名:{studentInfo.firstName}</li>
            );
          })}
        </ul> */}

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
