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

  const allBusinessInfo = async () => {
    const _likedBusiness = [];
    const info = await db.collection("Businesses").get();
    info.forEach((doc) => {
      _likedBusiness.push({
        businessId: doc.id,
        ...doc.data(),
      });
    });
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
