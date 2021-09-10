import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";

export default function RankingBusiness() {
  const [businessData, setBusinessData] = useState([]);

  useEffect(() => {
    const getBusinessData = db
      .collection("Companies")
      .doc("jidiFGi3I5Ym7GvvLRH9tb4lXBV2")
      .collection("Businesses")
      .onSnapshot((querySnapshot) => {
        const _businesses = querySnapshot.docs.map((doc) => {
          return {
            businessId: doc.id,
            ...doc.data(),
          };
        });
        setBusinessData(_businesses);
      });
  }, []);

  return (
    <>
      <COntainer>
        <br />
        <UL>
          {businessData.map((business) => {
            return (
              <LI key={business.businessId}>
                業務：{business.business}
                <br />
                勤務場所：{business.location}
                <br />
                想定報酬額：{business.reward}
                <br />
                いいね数：{"星の数"}
              </LI>
            );
          })}
        </UL>
        <br />
        <br />
        <br />
        <br />
      </COntainer>
    </>
  );
}

const COntainer = styled.div`
  padding: 200px 0 0 40px;
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
