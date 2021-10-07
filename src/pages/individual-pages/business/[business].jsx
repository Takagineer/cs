import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import App from "../../../components/App";
import { db } from "../../../firebase";
import Loading from "../../Loading";
import styled from "styled-components";
import Image from "next/image";

export default function business() {
  const router = useRouter();
  const isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  const [businessInfo, setBusinessInfo] = useState([]);
  const [businessImageUrl, setBusinessImageUrl] = useState();

  const getBusinessInformation = async () => {
    const info = await db
      .collection("Businesses")
      .doc(router.query.business)
      .get();
    setBusinessInfo(info.data());
  };

  const getBusinessImageUrl = async () => {
    console.log("画像データの取得");
  };

  useEffect(() => {
    setLoading(true);
    getBusinessInformation();
  }, [isReady]);

  if (!loading) {
    return <Loading />;
  }

  return (
    <>
      <App>
        <COntainer>
          <br />
          <br />
          <br />
          <h1>業務詳細ページ</h1>
          <br />

          {businessInfo === undefined ? (
            "No information"
          ) : (
            <>
              <img src={businessInfo.imageURL} width={400} height={300} />
              {/* <Image
                src={
                  "https://firebasestorage.googleapis.com/v0/b/my-app-cs-f7306.appspot.com/o/images%2FjidiFGi3I5Ym7GvvLRH9tb4lXBV2%2Fhammer-719066_1920.jpeg?alt=media&token=10007bb7-d26d-4936-a1d4-e9854b8aea6a"
                }
                width={400}
                height={300}
              /> */}
              {/* <Image src={businessInfo.imageURL} width={400} height={300} /> */}
              <h1>業務 ：{businessInfo.business}</h1>
              <h1>業務内容 ：{businessInfo.detail}</h1>
              <h1>勤務場所 ：{businessInfo.location}</h1>
              <h1>採用人数 ：{`${businessInfo.number}人`}</h1>
              <h1>想定報酬額 ：{`${businessInfo.reward}/月`}</h1>
            </>
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
