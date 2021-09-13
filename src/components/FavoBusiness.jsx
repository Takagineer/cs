import React, { useState } from "react";
import { db } from "../firebase";
import styled from "styled-components";

export default function RankingFav() {
  const [favoBusinessData, setFavoBusinessData] = useState([]);

  const getFavoBusinessData = db
    .collection("Businesses")
    .onSnapshot((querySnapshot) => {
      const _favoBusinesses = querySnapshot.docs.map((doc) => {
        return {
          businessId: doc.id,
          ...doc.data(),
        };
      });
      setFavoBusinessData(_favoBusinesses);
    });
  return (
    <>
      <COntainer>
        <UL>
          {favoBusinessData.map((business) => {
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
