import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Link from "next/Link";
import { auth, db, signOut, storage } from "../../../firebase";
import App from "../../../components/App";
import styled from "styled-components";
import Loading from "../../Loading";
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
import Image from "next/image";

export default function company() {
  const router = useRouter();
  const isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState();
  const [companyBusinessInfo, setCompanyBusinessInfo] = useState();
  const [companyBusinessImageUrl, setCompanyBusinessImageUrl] = useState([]);
  const [exists, setExists] = useState(false);

  const getCompanyInformation = async () => {
    const info = await db
      .collection("Companies")
      .doc(router.query.company)
      .get();
    setCompanyInfo(info.data());
  };

  const getCompanyBusinessInformation = async () => {
    const businessInfo = await db
      .collection("Businesses")
      .where("companyId", "==", router.query.company)
      .get();
    const _companyBusinessInfo = [];
    businessInfo.forEach((doc) => {
      _companyBusinessInfo.push({
        businessId: doc.id,
        ...doc.data(),
      });
    });

    const _businessInfoWithSub = [];
    _companyBusinessInfo.map(async (business) => {
      const subCollection = await db
        .collection("Businesses")
        .doc(business.businessId)
        .collection("isApplied")
        .get();

      _businessInfoWithSub.push({
        ...business,
        sub: subCollection.size,
      });
      setCompanyBusinessInfo(_businessInfoWithSub);
    });
  };

  useEffect(() => {
    if (isReady) {
      setLoading(true);
      getCompanyInformation();
      getCompanyBusinessInformation();
    }
  }, [isReady]);

  if (!loading) {
    return <Loading />;
  }

  return (
    <>
      <App>
        <COntainer>
          {companyInfo === undefined ? (
            ""
          ) : (
            <>
              <H2>登録情報</H2>
              <TAble>
                <tbody>
                  <tr>
                    <TH>会社名</TH>
                    <TD>{companyInfo.companyName}</TD>
                  </tr>
                  <tr>
                    <TH>email</TH>
                    <TD>{companyInfo.email}</TD>
                  </tr>
                  <tr>
                    <TH>連絡先</TH>
                    <TD>{companyInfo.phoneNumber}</TD>
                  </tr>
                </tbody>
              </TAble>
              <br />
              <Link href="../../auth/UpdateCompanyInformation">
                <Button variant="contained" color="primary">
                  登録情報編変更
                </Button>
              </Link>
              <br />
              <br />
              <Link
                href={{
                  pathname: "/individual-pages/CompanyBusinesses",
                  query: { companyName: companyInfo.companyName },
                }}
              >
                <Button variant="contained" color="primary">
                  求人を出す
                </Button>
              </Link>
            </>
          )}
          <br />
          <br />
          <br />
          {companyBusinessInfo === undefined ? (
            ""
          ) : (
            <>
              <H2>募集している業務</H2>
              {companyBusinessInfo.map((business) => {
                return (
                  <>
                    <CArd
                      sx={{ maxWidth: 345 }}
                      key={business.businessId}
                      style={
                        business.sub === 0
                          ? { background: "white" }
                          : { background: "#e9dfe5" }
                      }
                    >
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
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {business.companyName}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                            >
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
                    <br />
                  </>
                );
              })}
            </>
          )}
          <br />
          <br />

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

const UL = styled.ul`
  list-style: none;
`;

const LI = styled.li`
  padding: 10px 20px;
  margin: 10px;
  border-radius: 20px;
  border: solid 5px #fdeff2;
  background-color: #f5b1aa;
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
  border-radius: 20px;
  margin: 20px 40px 20px 10px;
`;
