import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";

export default function RankingBusiness() {
  const [businessData, setBusinessData] = useState([]);

  useEffect(() => {
    // const getBusinessData = async () => {
    //   const getBusinessDataCollection = await db.collection("Businesses").get();
    //   const _businessData = [];
    //   getBusinessDataCollection.forEach((businessData) => {
    //     _businessData.push({
    //       businessId: businessData.id,
    //       ...businessData.data(),
    //     });
    //     setBusinessData(_businessData);
    //   });
    // };
    const getBusinessData = db
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
        <r />
        <br />
        <br />
        <br />
        <br />
        <UL>
          {businessData.map((business) => {
            return (
              <li key={business.businessId}>
                {business.business}
                <br />
                {business.location}
                <br />
                {business.reward}
                <br />
                {"星の数"}
                <hr />
              </li>
            );
          })}
        </UL>
        <br />
        <br />
        <br />
        <br />
        <br />
      </COntainer>
    </>
  );
}

const COntainer = styled.div`
  height: 300px;
  padding: 100px 0 0 40px;
`;

const UL = styled.ul`
  background-color: white;
  list-style: none;
  border-radius: 20px;
`;
