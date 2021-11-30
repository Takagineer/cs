import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import {
  IconButton,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import BusinessData from "./BusinessData";
import Link from "next/link";
import Loading from "../pages/Loading";
import { constSelector } from "recoil";
import BusinessInformation from "./BusinessInformation";

export default function RankingBusiness() {
  const [newBusinessInfo, setNewBusinessInfo] = useState();

  //最初のレンダリング時に、業務データを取得し、取得したデータにサブコレクションのデータを業務データのオブジェクトに持たせる。
  const allBusinessInfo = async () => {
    const _newBusiness = [];
    const _likedBusiness = [];

    const info = await db.collection("Businesses").get();
    info.forEach((doc) => {
      _newBusiness.push({
        businessId: doc.id,
        ...doc.data(),
      });
    });

    for (const business of _newBusiness) {
      const subCollection = await db
        .collection("Businesses")
        .doc(business.businessId)
        .collection("isLiked")
        .get();

      _likedBusiness.push({
        ...business,
      });
    }
    setNewBusinessInfo(_likedBusiness);
  };

  useEffect(() => {
    allBusinessInfo();
  }, []);

  return (
    <>
      <COntainer>
        {newBusinessInfo === undefined ? (
          <Loading />
        ) : (
          <>
            {newBusinessInfo.map((business, index) => {
              return <BusinessInformation data={newBusinessInfo[index]} />;
            })}
          </>
        )}
      </COntainer>
    </>
  );
}

const COntainer = styled.div`
  padding: 0 0 40px 20px;
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

const CArd = styled(Card)`
  padding: 30px 30px 30px 30px;
`;

const A = styled.a`
  display: inline-block;
  margin: 0 9px 8px 0;
  padding: 9px;
  line-height: 1;
  text-decoration: none;
  color: #0000ee;
  background-color: #fff;
  border: 1px solid #0000ee;
  border-radius: 32px;
`;
