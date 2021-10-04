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
  const [companyBusinessImageUrl, setCompanyBusinessImageUrl] = useState();

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
        // image: storage.ref().child(doc.data().imageURL).getDownloadURL(),
      });
      console.log("開始します");
      const companyBusinessImageURL = doc.data().imageURL;
      setCompanyBusinessImageUrl(
        storage.ref().child(companyBusinessImageURL).getDownloadURL()
      );
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

          <h2>募集している業務</h2>
          {companyBusinessInfo === undefined ? (
            "Loading"
          ) : (
            <UL>
              {companyBusinessInfo.map((business) => {
                return (
                  <LI key={business.businessId}>
                    業務：{business.business}
                    <br />
                    勤務場所：{business.location}
                    <br />
                    報酬：{business.reward}
                    <br />
                    ステータス:募集中（仮）
                    <br />
                    ステータス:
                    {companyBusinessImageUrl === undefined
                      ? "No photos"
                      : // <Image src={companyBusinessImageUrl} />
                        "写真の表示"}
                  </LI>
                );
              })}
            </UL>
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

const UL = styled.ul`
  list-style: none;
`;

const LI = styled.li`
  padding: 10px 20px;
  margin: 10px;
  border-radius: 20px;
  border: solid 5px #59b9c6;
`;
