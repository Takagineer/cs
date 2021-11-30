import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import Loading from "../pages/Loading";
import BusinessInformation from "./BusinessInformation";

export default function RankingBusinessReward() {
  const [rewardBusinessInfo, setRewardBusinessInfo] = useState();

  const allBusinessInfo = async () => {
    const _businessInfo = [];
    const info = await db
      .collection("Businesses")
      .orderBy("reward", "desc")
      .get();
    info.forEach((doc) => {
      _businessInfo.push({
        businessId: doc.id,
        ...doc.data(),
      });
    });
    setRewardBusinessInfo(_businessInfo);
  };

  useEffect(() => {
    allBusinessInfo();
  }, []);

  return (
    <>
      <COntainer>
        {rewardBusinessInfo === undefined ? (
          "ロード中"
        ) : (
          <>
            {rewardBusinessInfo.map((business, index) => {
              return <BusinessInformation data={rewardBusinessInfo[index]} />;
            })}
          </>
        )}
      </COntainer>
    </>
  );
}
const COntainer = styled.div`
  padding: 0 0 0 20px;
`;
