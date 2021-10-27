import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import App from "../../../components/App";
import { db, signOut } from "../../../firebase";
import styled from "styled-components";
import Link from "next/Link";
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
  const [studentBusinessInfo, setStudentBusinessInfo] = useState();

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

    const _businessInfo = [];
    appliedBusinessInfo.forEach((doc) => {
      const businessInfo = db
        .collection("Businesses")
        .doc(doc.data().businessId)
        .get();
      _businessInfo.push({
        businessId: businessInfo.id,
        ...businessInfo.data(),
      });
    });
    setStudentBusinessInfo(_businessInfo);
    console.log(_businessInfo);
    // const _businessInfo = [];
    // appliedBusinessInfo.forEach((doc) => {
    //   const businessInfo = db
    //     .collection("Businesses")
    //     .doc(doc.data().businessId)
    //     .get();
    //   _businessInfo.push({
    //     businessId: doc.id,
    //     ...doc.data(),
    //   });
    // });
    // const appliedWorks = [];
    // appliedBusinessInfo.forEach((doc) => {
    //   appliedWorks.push({
    //     businessId: doc.id,
    //     ...doc.data(),
    //   });
    // });
    // console.log({ appliedWorks: appliedWorks.length });
    // console.log({ appliedWorks: appliedWorks });

    // const businessDatas = [];
    // appliedWorks.map(async (appliedWork) => {
    //   const businessData = await db
    //     .collection("Businesses")
    //     .doc(appliedWork.businessId)
    //     .get();
    //   businessDatas.push({
    //     businessId: appliedWork.businessId,
    //     ...businessData.data(),
    //   });
    // });

    // console.log({ businessDatas: businessDatas.length });
    // console.log({ businessDatas: businessDatas });
    // setStudentBusinessInfo(businessDatas);
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

        {studentBusinessInfo === undefined ? (
          ""
        ) : (
          <>
            <H2>応募している業務</H2>
            {studentBusinessInfo.map((business) => {
              return (
                <CArd sx={{ maxWidth: 345 }}>
                  <Link
                    href={{
                      pathname: "/individual-pages/business/[business]",
                      query: { business: business.businessId },
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="300"
                        image={business.imageURL}
                        alt="green iguana"
                      />
                      <CardContent>
                        {/* <Typography gutterBottom variant="h5" component="div">
                          {business.companyName}
                        </Typography> */}
                        <Typography gutterBottom variant="h5" component="div">
                          {business.business}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {business.message}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="text.secondary">
                          {business.location}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="text.secondary">
                          {`${business.reward}/月`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                  <CardActions>
                    <br />
                    <IconButton
                      aria-label="settings"
                      onClick={() => {
                        handleClickFavo(business);
                      }}
                    >
                      {business.favo === false ? (
                        <FavoriteTwoToneIcon />
                      ) : (
                        <FavoriteTwoToneIcon color="secondary" />
                      )}
                    </IconButton>
                  </CardActions>
                </CArd>
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
