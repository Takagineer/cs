import React, { useState } from "react";
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

export default function RankingBusinessReward() {
  const [rewardBusinessData, setRewardBusinessData] = useState([]);
  const getRewardBusinessData = db
    .collection("Businesses")
    .orderBy("reward", "desc")
    .onSnapshot((querySnapshot) => {
      const _rewardBusinesses = querySnapshot.docs.map((doc) => {
        return {
          businessId: doc.id,
          ...doc.data(),
        };
      });
      setRewardBusinessData(_rewardBusinesses);
    });

  return (
    <>
      <COntainer>
        <UL>
          {rewardBusinessData.map((business) => {
            return (
              <>
                <CArd sx={{ maxWidth: 345 }}>
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
                  {/* <CardActions>
                    <br />
                    <IconButton
                      aria-label="settings"
                      onClick={() => {
                        handleClickFavo(business);
                      }}
                    >
                      {business.favo === false ? (
                        <FavoriteTwoToneIcon />
                      ) : (
                        <FavoriteTwoToneIcon color="secondary" />
                      )}

                      {isLiked === true ? "あかい" : "くろい"}
                    </IconButton>
                  </CardActions> */}
                </CArd>
                <br />
              </>
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
  border: solid 5px #fdeff2;
  background-color: #f5b1aa;
`;

const CArd = styled(Card)`
  padding: 30px;
`;

const A = styled.a`
  display: inline-block;
  margin: 3px 9px 8px 0;
  padding: 9px;
  line-height: 1;
  text-decoration: none;
  color: #0000ee;
  background-color: #fff;
  border: 1px solid #0000ee;
  border-radius: 32px;
`;
