import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Link from "next/Link";
import { auth, db, signOut } from "../../../firebase";
import App from "../../../components/App";
import styled from "styled-components";
import Loading from "../../Loading";
import { Button } from "@material-ui/core";

export default function company() {
  const router = useRouter();
  const isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState();
  const [companyBusinessInfo, setCompanyBusinessInfo] = useState();

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
          <table border="3" bordercolor="green" width="50%" height="200px">
            <thead>
              <tr>
                <th colSpan="2">会社概要</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TD>会社名</TD>
                {companyInfo === undefined ? (
                  "抽出中"
                ) : (
                  <TD>{`${companyInfo.companyName}`}</TD>
                )}
              </tr>
            </tbody>
          </table>

          {companyBusinessInfo === undefined ? (
            "Loading"
          ) : (
            <ul>
              {companyBusinessInfo.map((business) => {
                return (
                  <li key={business.businessId}>
                    業務：{business.business}
                    報酬：{business.reward}
                    勤務場所：{business.location}
                  </li>
                );
              })}
            </ul>
          )}
          <br />
          <br />
          <Link href="/individual-pages/CompanyBusinesses">
            <Button variant="contained" color="primary">
              業務募集
            </Button>
          </Link>
          <br />
          <br />
          <br />
          <Link href="#">
            <Button
              variant="contained"
              color="primary"
              onClick={editCompanyInformation}
            >
              登録情報編変更
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
    </>
  );
}
const COntainer = styled.div`
  padding: 100px 0 100px 50px;
`;

const TD = styled.td`
  white-space: nowrap;
  text-align: center;
`;
