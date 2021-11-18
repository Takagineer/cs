import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import {
  IconButton,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import BusinessData from "./BusinessData";
import Link from "next/link";
import Loading from "../pages/Loading";

export default function RankingBusiness() {
  // const { newBusinessInfo } = props;
  // console.log({ newBusinessInfoの値: newBusinessInfo });
  const [newBusinessInfo, setNewBusinessInfo] = useState();

  // const [newBusinessData, setNewBusinessData] = useState([]);
  // const [favo, setFavo] = useState(false);
  // const [likeCount, setLikeCount] = useState();

  // useEffect(() => {
  //   const getNewBusinessData = db
  //     .collection("Businesses")
  //     .orderBy("timestamp")
  //     .limit(10)
  //     .onSnapshot((querySnapshot) => {
  //       const _newBusinesses = querySnapshot.docs.map((doc) => {
  //         return {
  //           businessId: doc.id,
  //           ...doc.data(),
  //         };
  //       });
  //       setNewBusinessData(_newBusinesses);
  //     });
  // }, []);

  const allBusinessInfo = async () => {
    const newBusiness = [];
    const info = await db.collection("Businesses").get();
    info.forEach((doc) => {
      newBusiness.push({
        businessId: doc.id,
        ...doc.data(),
      });
    });
    setNewBusinessInfo(newBusiness);
  };

  useEffect(() => {
    allBusinessInfo();
  }, []);

  return (
    <>
      <COntainer>
        {/* <BusinessData /> */}
        {newBusinessInfo === undefined ? (
          <Loading />
        ) : (
          <>
            {newBusinessInfo.map((business, index) => {
              return (
                <>
                  <CArd sx={{ maxWidth: 345 }} key={business.businessId}>
                    <Link
                      href={{
                        pathname: "individual-pages/business/[business]",
                        query: { business: business.businessId },
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="300"
                          image={business.imageURL}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {business.companyName}
                          </Typography>
                          <Typography gutterBottom variant="h6" component="div">
                            {business.business}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {business.message}
                          </Typography>
                          <br />
                          <Typography variant="body2" color="text.secondary">
                            {business.location}
                          </Typography>
                          <br />
                          <Typography variant="body2" color="text.secondary">
                            {`${business.reward}/月`}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>

                    {business.skill.map((skill) => {
                      return <A key={skill.label}>{skill.label}</A>;
                    })}
                  </CArd>
                  <br />
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
