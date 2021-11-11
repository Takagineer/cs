import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import App from "../../../components/App";
import { db, signOut } from "../../../firebase";
import styled from "styled-components";
import Link from "next/link.js";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import { info } from "firebase-functions/lib/logger";
import Loading from "../../Loading";
import { SettingsSystemDaydreamTwoTone } from "@material-ui/icons";

export default function student() {
  const router = useRouter();
  const isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState();
  const [studentBusinessInfo, setStudentBusinessInfo] = useState([]);

  const getStudentInformation = async () => {
    const info = await db
      .collection("Students")
      .doc(router.query.student)
      .get();
    setStudentInfo(info.data());
  };

  const getStudentAppliedBusinessData = async () => {
    const appliedBusinessInfo = await db
      .collection("Students")
      .doc(router.query.student)
      .collection("apply")
      .get();
    const _appliedBusinessInfo = [];
    appliedBusinessInfo.forEach((doc) => {
      _appliedBusinessInfo.push({
        businessId: doc.id,
        ...doc.data(),
      });
    });
    setStudentBusinessInfo(_appliedBusinessInfo);
  };

  useEffect(() => {
    if (isReady) {
      setLoading(true);
      getStudentInformation();
      getStudentAppliedBusinessData();
    }
  }, [isReady]);

  if (!loading) {
    return <Loading />;
  }

  return (
    <App>
      <COntainer>
        {studentInfo === undefined ? (
          ""
        ) : (
          <TAble>
            <tbody>
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
            </tbody>
          </TAble>
        )}

        {studentBusinessInfo === undefined ? (
          ""
        ) : (
          <>
            <H2>応募している業務</H2>
            {studentBusinessInfo.map((business) => {
              return (
                <Link
                  href={{
                    pathname: "/individual-pages/business/[business]",
                    query: { business: business.businessId },
                  }}
                  key={business.businessId}
                >
                  <UL
                    style={
                      business.applyStatusByStudent === "応募中"
                        ? { background: "#e5abbe" }
                        : business.applyStatusByStudent === "審査中"
                        ? { background: "#ffd900" }
                        : business.applyStatusByStudent === "残念..."
                        ? { background: "#bbbcde" }
                        : business.applyStatusByStudent === "通過"
                        ? { background: "#98d98e" }
                        : { background: "#e5e4e6" }
                    }
                  >
                    <LI>{business.companyName}</LI>
                    <LI>{business.applyStatusByStudent}</LI>
                  </UL>
                </Link>
              );
            })}
          </>
        )}

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

const H2 = styled.h2`
  color: #364e96
  padding: 10px
  border-top: solid 3px #364e96;
  border-bottom: solid 3px #364e96;
`;

const CArd = styled(Card)`
  padding: 30px 30px 30px 30px;
`;

const UL = styled.ul`
  background: #f3f3f2;
  border-radius: 8px;
  box-shadow: 0px 0px 5px silver;
  padding: 0.5em 0.5em 0.5em 2em;
  margin-bottom: 20px;
  list-style: none;
  margin-right: 40%;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1, 1.1);
  }
`;
const LI = styled.li`
  line-height: 1.5;
  padding: 10px 0;
`;
