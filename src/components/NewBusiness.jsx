import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { IconButton } from "@material-ui/core";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import BusinessData from "./BusinessData";

export default function RankingBusiness() {
  const [newBusinessData, setNewBusinessData] = useState([]);
  const [favo, setFavo] = useState(false);
  const [likeCount, setLikeCount] = useState();

  useEffect(() => {
    const getNewBusinessData = db
      .collection("Businesses")
      .orderBy("timestamp")
      .limit(10)
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

  const handleClickFavo = () => {
    if (favo === false) {
      setFavo(true);
    } else {
      setFavo(false);
    }
  };

  return (
    <>
      <COntainer>
        {/* <UL>
          {newBusinessData.map((business) => {
            return (
              <LI key={business.businessId}>
                {<img src={business.imageURL} width={400} height={300} />}
                <br />
                <br />
                業務：{business.business}
                <br />
                勤務場所：{business.location}
                <br />
                想定報酬額：{`${business.reward}/月`}
                <br />
                <IconButton aria-label="settings" onClick={handleClickFavo}>
                  {favo === false ? (
                    <FavoriteTwoToneIcon />
                  ) : (
                    <FavoriteTwoToneIcon color="secondary" />
                  )}
                </IconButton>
                {business.favo}
              </LI>
            );
          })}
        </UL>
        <br />
        <br />
        <br /> */}
        <BusinessData />
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
