import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import styled from "styled-components";
import BusinessData from "./BusinessData";

export default function RankingBusinessPopular() {
  const [applyBusinessInfo, setApplyBusinessInfo] = useState();

  const getApplyBusinessInfo = async () => {
    const _applyInfo = [];
    const _appliedBusinessInfo = [];

    const applyInfo = await db.collection("Businesses").get();
    applyInfo.forEach((doc) => {
      _applyInfo.push({
        businessId: doc.id,
        ...doc.data(),
      });
    });

    _applyInfo.map(async (business) => {
      const subCollection = await db
        .collection("Businesses")
        .doc(business.businessId)
        .collection("isApplied")
        .get();
      _appliedBusinessInfo.push({
        business,
        sub: subCollection.size,
      });
    });
    setApplyBusinessInfo(_appliedBusinessInfo);
    console.log("set関数にsetしている");
    console.log(_appliedBusinessInfo);
  };

  useEffect(() => {
    getApplyBusinessInfo();
  }, []);

  return (
    <>
      <COntainer>
        {/* <UL>
          {applyBusinessData.map((business) => {
            return (
              <LI key={business.businessId}>
                {<img src={business.imageURL} width={400} height={300} />}
                <br />
                業務：{business.business}
                <br />
                勤務場所：{business.location}
                <br />
                想定報酬額：{`${business.reward}/月`}
                <br />
                いいね数：{"星の数"}
              </LI>
            );
          })}
        </UL> */}
        {/* <BusinessData /> */}
        {/* {applyBusinessInfo === undefined ? (
          "しばらくお待ちください"
        ) : (
          <>
            {applyBusinessInfo.map((info) => {
              return (
                <>
                  {info.sub === 0 ? (
                    ""
                  ) : (
                    <div key={info.business.businessId}>{info.sub}</div>
                  )}
                </>
              );
            })}
          </>
        )} */}
      </COntainer>
    </>
  );
}
const COntainer = styled.div`
  padding: 0 0 0 20px;
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
