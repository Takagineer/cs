import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import App from "../../../components/App";
import { db, auth } from "../../../firebase";
import Loading from "../../Loading";
import styled from "styled-components";
import Image from "next/image";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

export default function business() {
  const router = useRouter();
  const isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  const [businessInfo, setBusinessInfo] = useState([]);
  const [businessImageUrl, setBusinessImageUrl] = useState();
  const [businessStatus, setBusinessStatus] = useState("募集中");
  const [logInUser, setLogInUser] = useState();

  const getBusinessInformation = async () => {
    const info = await db
      .collection("Businesses")
      .doc(router.query.business)
      .get();
    setBusinessInfo(info.data());
  };

  const checkExistWhichCollection = async () => {
    if (auth.currentUser === null) {
      setLogInUser("未ログイン");
    } else {
      const studentsDoc = await db
        .collection("Students")
        .doc(auth.currentUser.uid)
        .get();
      const studentsDataExists = studentsDoc.exists;

      const companiesDoc = await db
        .collection("Companies")
        .doc(auth.currentUser.uid)
        .get();
      const companiesDataExists = companiesDoc.exists;

      if (studentsDataExists === true) {
        setLogInUser("学生");
      } else if (companiesDataExists === true) {
        setLogInUser("企業");
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    getBusinessInformation();
    checkExistWhichCollection();
  }, [isReady]);

  if (!loading) {
    return <Loading />;
  }

  const handleChange = (e) => {
    setBusinessStatus(e.target.value);
  };

  const changeBusinessStatus = (e) => {
    db.collection("Businesses").doc(router.query.business).set(
      {
        applyStatus: businessStatus,
      },
      { merge: true }
    );
    alert("更新しました");
  };

  const applyWork = async () => {
    const appliedData = await db
      .collection("AppliedWorks")
      .where("businessId", "==", router.query.business)
      .where("studentId", "==", auth.currentUser.uid)
      .get();

    const zeroOrOne = appliedData.size;

    if (zeroOrOne === 0) {
      db.collection("AppliedWorks").add({
        businessId: router.query.business,
        studentId: auth.currentUser.uid,
        applyStatusByStudent: "応募中",
      });
      alert("応募しました");
    } else {
      console.log("ボタンを非表示に変更する記述");
    }
  };

  return (
    <>
      <App>
        <COntainer>
          <br />
          <br />
          {businessInfo === undefined ? (
            "No information"
          ) : (
            <>
              <TAble>
                <tr>
                  <td colSpan="2">
                    {businessInfo.imageURL && (
                      <Image
                        src={businessInfo.imageURL}
                        width={600}
                        height={300}
                        objectFit="contain"
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <TH>業務</TH>
                  <TD>{businessInfo.business}</TD>
                </tr>
                <tr>
                  <TH>業務内容</TH>
                  <TD>{businessInfo.detail}</TD>
                </tr>
                <tr>
                  <TH>勤務場所</TH>
                  <TD>{businessInfo.location}</TD>
                </tr>
                <tr>
                  <TH>採用人数</TH>
                  <TD>000-{`${businessInfo.number}人`}-0000</TD>
                </tr>
                <tr>
                  <TH>想定報酬額</TH>
                  <TD>{`${businessInfo.reward}/月`}</TD>
                </tr>
                <tr>
                  <TH>企業からのメッセージ</TH>
                  <TD>{businessInfo.message}</TD>
                </tr>
              </TAble>
            </>
          )}
          <br />
          <br />
          <br />
          {businessInfo === undefined || auth.currentUser === null ? (
            ""
          ) : businessInfo.companyId === auth.currentUser.uid ? (
            <>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  募集状況
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Age"
                  onChange={handleChange}
                  value={businessStatus}
                >
                  <MenuItem value={"募集中"}>募集中</MenuItem>
                  <MenuItem value={"締め切り間近"}>締め切り間近</MenuItem>
                  <MenuItem value={"募集締め切り"}>募集終了</MenuItem>
                </Select>
                <FormHelperText>
                  一度募集締め切りに変更し、更新してしまうと変更できなくなります。
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={changeBusinessStatus}
              >
                募集状況更新
              </Button>
            </>
          ) : (
            ""
          )}
          <br />
          <br />

          <br />
          <br />
          {logInUser === "学生" && (
            <Button variant="contained" color="primary" onClick={applyWork}>
              応募
            </Button>
          )}
        </COntainer>
      </App>
    </>
  );
}

const COntainer = styled.div`
  padding: 100px 0 100px 50px;
  margin: auto;
`;

const TAble = styled.table`
  width: 80 %;
  border-spacing: 0;
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
