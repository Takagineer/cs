import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Link from "next/Link";
import { auth, db, signOut, storage } from "../../../firebase";
import App from "../../../components/App";
import styled from "styled-components";
import Loading from "../../Loading";
import { Button } from "@material-ui/core";
import Image from "next/image";

export default function company() {
  const router = useRouter();
  const isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState();
  const [companyBusinessInfo, setCompanyBusinessInfo] = useState();
  const [companyBusinessImageUrl, setCompanyBusinessImageUrl] = useState([]);

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
    setCompanyBusinessInfo(_companyBusinessInfo);
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

  const editCompanyInformation = () => {
    console.log("登録情報を編集します");
  };
  return (
    <>
      <App>
        <COntainer>
          {companyInfo === undefined ? (
            "Loading..."
          ) : (
            <>
              <h2>{`${companyInfo.companyName} 様`}</h2>
              <h3>登録情報</h3>
              <TAble>
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
              </TAble>
            </>
          )}
          <Link href="../../auth/UpdateCompanyInformation">
            <Button
              variant="contained"
              color="primary"
              onClick={editCompanyInformation}
            >
              登録情報編変更
            </Button>
          </Link>
          <br />
          <h3>募集している業務</h3>
          {companyBusinessInfo === undefined ? (
            ""
          ) : (
            <UL>
              {companyBusinessInfo.map((business) => {
                return (
                  <LI key={business.businessId}>
                    {business.imageURL === undefined ? (
                      "No photo"
                    ) : (
                      <Image src={business.imageURL} width={400} height={300} />
                    )}
                    <br />
                    業務：{business.business}
                    <br />
                    勤務場所：{business.location}
                    <br />
                    報酬：{`${business.reward}/月`}
                    <br />
                    {business.imageUrl}
                  </LI>
                );
              })}
            </UL>
          )}
          <br />
          <br />
          {companyInfo === undefined ? (
            "Loading ..."
          ) : (
            <Link href="/individual-pages/CompanyBusinesses">
              <Button
                variant="contained"
                color="primary"
                companyInfo={companyInfo}
              >
                業務募集
              </Button>
            </Link>
          )}
          <br />
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
