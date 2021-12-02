import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import styled from "styled-components";
import BusinessData from "./BusinessData";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import Link from "next/link";
import Loading from "../pages/Loading";
import BusinessInformation from "./BusinessInformation";

export default function RankingBusinessPopular() {
  const [applyBusinessInfo, setApplyBusinessInfo] = useState();

  const allBusinessInfo = async () => {
    const _applyInfo = [];
    const _appliedBusinessInfo = [];

    const applyInfo = await db.collection("Businesses").get();
    applyInfo.forEach((doc) => {
      _applyInfo.push({
        businessId: doc.id,
        ...doc.data(),
      });
    });

    for (const business of _applyInfo) {
      const subCollection = await db
        .collection("Businesses")
        .doc(business.businessId)
        .collection("isApplied")
        .get();
      _appliedBusinessInfo.push({
        businessId: business.businessId,
        ...business,
        sub: subCollection.size,
      });
    }
    const newApplyBusinessInfo = _appliedBusinessInfo.filter(
      (size) => size.sub != 0
    );
    setApplyBusinessInfo(newApplyBusinessInfo);
  };

  useEffect(() => {
    allBusinessInfo();
  }, []);

  return (
    <>
      <COntainer>
        {applyBusinessInfo === undefined ? (
          <Loading />
        ) : (
          applyBusinessInfo.map((business, index) => {
            return <BusinessInformation data={applyBusinessInfo[index]} />;
          })
        )}
      </COntainer>
    </>
  );
}
const COntainer = styled.div`
  padding: 0 0 0 20px;
`;
