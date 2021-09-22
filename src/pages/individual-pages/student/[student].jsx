import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import App from "../../../components/App";
import { db, signOut } from "../../../firebase";
import styled from "styled-components";
import Link from "next/Link";
import { Button } from "@material-ui/core";
import { info } from "firebase-functions/lib/logger";

export default function student() {
  const router = useRouter();
  const [studentInfo, setStudentInfo] = useState();

  const getStudentInformation = async () => {
    if (router.query.student === !undefined) {
      const info = await db
        .collection("Students")
        .doc(router.query.student)
        .get();
      console.log(router.query.student);
      setStudentInfo(info.data());
    }
    //router.queryがnullなら処理を行わない記述する

    // console.log(info.data());
    // console.log(info.data().firstName);
    // setStudentInfo(info.data());
    // console.log(studentInfo);
  };

  useEffect(() => {
    if (router.query.student === undefined) {
      console.log("しばらくお待ちください");
    } else {
      getStudentInformation();
    }
  }, [router.query.student]);
  // useEffect(() => {
  //   const getStudentData = db
  //     .collection("Students")
  //     .doc(router.query.student)
  //     .onSnapshot((querySnapshot) => {
  //       const _studentInfo = querySnapshot.docs.map((doc) => {
  //         return {
  //           studentId: doc.id,
  //           ...doc.data(),
  //         };
  //       });
  //       setStudentInfo(_studentInfo);
  //     });
  // }, []);

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
              <td>{"studentInfo.firstName"}</td>
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
