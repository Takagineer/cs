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

export default function RankingBusinessPopular() {
  const [applyBusinessInfo, setApplyBusinessInfo] = useState();

  const getApplyBusinessInfo = async () => {
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
        business,
        sub: subCollection.size,
      });
    }

    setApplyBusinessInfo(_appliedBusinessInfo);
  };

  useEffect(() => {
    getApplyBusinessInfo();
  }, []);

  useEffect(() => {
    console.log("検知", applyBusinessInfo);
  }, [applyBusinessInfo]);

  return (
    <>
      <COntainer>
        {applyBusinessInfo === undefined ? (
          "しばらくお待ちください"
        ) : (
          <>
            {applyBusinessInfo.map((info) => {
              return (
                <>
                  {info.sub === 0 ? (
                    ""
                  ) : (
                    <>
                      <CArd
                        sx={{ maxWidth: 345 }}
                        key={info.business.businessId}
                      >
                        <Link
                          href={{
                            pathname: "individual-pages/business/[business]",
                            query: { business: info.business.businessId },
                          }}
                        >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="300"
                              image={info.business.imageURL}
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {info.business.companyName}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                              >
                                {info.business.business}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {info.business.message}
                              </Typography>
                              <br />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {info.business.location}
                              </Typography>
                              <br />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {`${info.business.reward}/月`}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Link>

                        {info.business.skill.map((skill) => {
                          return <A key={skill.label}>{skill.label}</A>;
                        })}
                      </CArd>
                      <br />
                    </>
                  )}
                </>
              );
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
