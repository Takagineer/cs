import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import { auth, db } from "../firebase";

function BusinessInformation(props) {
  const { data } = props;
  const [likedUser, setLikedUser] = useState();
  //業務一件一件に付随する、likeしているユーザーの取得及びstateでの管理をする。
  const getUser = () => {
    db.collection("Businesses")
      .doc(data.businessId)
      .collection("isLiked")
      .onSnapshot((querySnapshot) => {
        const _user = [];
        querySnapshot.forEach((doc) => {
          _user.push(doc.data().userId);
        });
        setLikedUser(_user);
      });
  };

  const handleClickFavo = async () => {
    const isIn = likedUser.find((iAm) => iAm === auth.currentUser.uid);

    if (!isIn) {
      await db
        .collection("Businesses")
        .doc(data.businessId)
        .collection("isLiked")
        .add({
          userId: auth.currentUser.uid,
        });
    } else {
      await db
        .collection("Businesses")
        .doc(data.businessId)
        .collection("isLiked")
        .where("userId", "==", auth.currentUser.uid)
        .get()
        .then((sub) => {
          sub.forEach((doc) => {
            doc.ref.delete();
          });
        });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <CArd sx={{ maxWidth: 345 }}>
        <Link
          href={{
            pathname: "individual-pages/business/[business]",
            query: { business: data.businessId },
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image={data.imageURL}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.companyName}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {data.business}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${data.reward}/月`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>

        {data.skill.map((skill) => {
          return <A key={skill.label}>{skill.label}</A>;
        })}
        <br />

        <CardActions>
          <br />
          <IconButton
            aria-label="settings"
            onClick={() => {
              handleClickFavo(data);
            }}
          >
            {auth.currentUser === null ? (
              <>
                <FavoriteTwoToneIcon />
                {likedUser && likedUser.length}
              </>
            ) : (
              <>
                {likedUser && likedUser.includes(auth.currentUser.uid) ? (
                  <>
                    <FavoriteTwoToneIcon color="secondary" />
                    {likedUser && likedUser.length}
                  </>
                ) : (
                  <>
                    <FavoriteTwoToneIcon />
                    {likedUser && likedUser.length}
                  </>
                )}
              </>
            )}
          </IconButton>
        </CardActions>
      </CArd>
      <br />
    </>
  );
}

export default BusinessInformation;

const CArd = styled(Card)`
  padding: 0px 30px;
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
