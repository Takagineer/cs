import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";

export default function RankingBusinessReward() {
  const [rewardBusinessData, setRewardBusinessData] = useState([]);
  const getRewardBusinessData = db
    .collection("Businesses")
    .orderBy("reward", "desc")
    .onSnapshot((querySnapshot) => {
      const _rewardBusinesses = querySnapshot.docs.map((doc) => {
        return {
          businessId: doc.id,
          ...doc.data(),
        };
      });
      setRewardBusinessData(_rewardBusinesses);
    });
  return (
    <>
      <COntainer>
        <UL>
          {rewardBusinessData.map((business) => {
            return (
              <LI key={business.businessId}>
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
        </UL>
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
  border: solid 5px #59b9c6;
`;
