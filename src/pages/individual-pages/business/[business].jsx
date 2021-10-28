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
  const [isApplied, setIsApplied] = useState(false);

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
      .collection("Businesses")
      .doc(router.query.business)
      .collection("isApplied")
      .where("studentId", "==", auth.currentUser.uid)
      .get();

    const zeroOrOne = appliedData.size;
    if (zeroOrOne === 0) {
      await db
        .collection("Businesses")
        .doc(router.query.business)
        .collection("isApplied")
        .doc(auth.currentUser.uid)
        .set(
          {
            studentId: auth.currentUser.uid,
            applyStatusByStudent: "応募中",
            companyName: businessInfo.companyName,
          },
          { merge: true }
        );
      await db
        .collection("Students")
        .doc(auth.currentUser.uid)
        .collection("apply")
        .doc(router.query.business)
        .set(
          {
            businessId: router.query.business,
            applyStatusByStudent: "応募中",
            companyName: businessInfo.companyName,
          },
          { merge: true }
        );
      console.log(businessInfo.companyName);
      alert("応募しました");
    } else {
      setIsApplied(true);
    }
  };

  return (
    <>
      <App>
        <COntainer>
          <br />
          {businessInfo === undefined ? (
            "No information"
          ) : (
            <>
              <TAble>
                <tbody>
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
                    <TH>会社名</TH>
                    <TD>{businessInfo.companyName}</TD>
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
                </tbody>
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
          {logInUser === "学生" && isApplied === false ? (
            <Button variant="contained" color="primary" onClick={applyWork}>
              応募
            </Button>
          ) : (
            <div>応募しています。企業からのご連絡をお待ちください。</div>
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
  padding: 100px;
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
