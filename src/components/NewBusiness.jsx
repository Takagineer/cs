import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";

export default function RankingBusiness() {
  const [newBusinessData, setNewBusinessData] = useState([]);

  useEffect(() => {
    const getNewBusinessData = db
      .collection("Businesses")
      .onSnapshot((querySnapshot) => {
        const _newBusinesses = querySnapshot.docs.map((doc) => {
          return {
            businessId: doc.id,
            ...doc.data(),
          };
        });
        setNewBusinessData(_newBusinesses);
      });
  }, []);

  return (
    <>
      <COntainer>
        <UL>
          {newBusinessData.map((business) => {
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
