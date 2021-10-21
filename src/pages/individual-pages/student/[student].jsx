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
        {studentInfo === undefined ? (
          ""
        ) : (
          <TAble>
            <tr>
              <TH>氏名</TH>

              <TD>{`${studentInfo.firstName} ${studentInfo.lastName}さん`}</TD>
            </tr>
            <tr>
              <TH>大学</TH>
              <TD>{`${studentInfo.university}`}</TD>
            </tr>
            <tr>
              <TH>年次</TH>
              <TD>{`${studentInfo.age} 歳`}</TD>
            </tr>
            <tr>
              <TH>自己紹介</TH>
              <TD>{`${studentInfo.introduction}`}</TD>
            </tr>
          </TAble>
        )}

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

const TAble = styled.table`
  width: 80 %;
  border-spacing: 0;
  padding: 80px;
  background-color: #fbfaf5;
  border-top: solid 5px #5d627b;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
`;

const TH = styled.th`
  border-bottom: solid 2px #fb5144;
  width: 30%;
  padding: 20px 0;
`;

const TD = styled.td`
  border-bottom: solid 2px #ddd;
  text-align: center;
  padding: 10px 0;
`;
