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

export default function RankingBusiness() {
  const [newBusinessInfo, setNewBusinessInfo] = useState();

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

      const _subCollectionDocument = [];

      subCollection.forEach((sub) => {
        _subCollectionDocument.push(sub.data().userId);
      });

      _likedBusiness.push({
        ...business,
        likedNumbers: subCollection.size,
        isIn: _subCollectionDocument.includes(auth.currentUser.uid),
      });
    }
    setNewBusinessInfo(_likedBusiness);
  };

  const handleClickFavo = async (business) => {
    const likedDocument = await db
      .collection("Businesses")
      .doc(business.businessId)
      .collection("isLiked")
      .where("userId", "==", auth.currentUser.uid)
      .get();
    //onSnapshot

    const likedDocumentByStudent = await db
      .collection("Students")
      .doc(auth.currentUser.uid)
      .collection("like")
      .where("businessId", "==", business.businessId)
      .get();
    //onSnapshot

    const zeroOrOne = likedDocument.size;

    if (zeroOrOne === 0) {
      await db
        .collection("Businesses")
        .doc(business.businessId)
        .collection("isLiked")
        .add({
          userId: auth.currentUser.uid,
        });
      await db
        .collection("Students")
        .doc(auth.currentUser.uid)
        .collection("like")
        .add({
          businessId: business.businessId,
        });
    } else {
      likedDocument.forEach((doc) => {
        db.collection("Businesses")
          .doc(business.businessId)
          .collection("isLiked")
          .doc(doc.id)
          .delete();
      });
      likedDocumentByStudent.forEach((doc) => {
        db.collection("Students")
          .doc(auth.currentUser.uid)
          .collection("like")
          .doc(doc.id)
          .delete();
      });
    }
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
                    <br />
                    <CardActions>
                      <br />
                      <IconButton
                        aria-label="settings"
                        onClick={() => {
                          handleClickFavo(business);
                        }}
                      >
                        {business.isIn === false ? (
                          <>
                            <FavoriteTwoToneIcon />
                            {business.likedNumbers}
                          </>
                        ) : (
                          <>
                            <FavoriteTwoToneIcon color="secondary" />
                            {business.likedNumbers}
                          </>
                        )}
                      </IconButton>
                    </CardActions>
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
