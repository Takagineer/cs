import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import styled from "styled-components";
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
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import { ContactsOutlined, LinkedCamera } from "@material-ui/icons";
import Link from "next/link";
import App from "./App";

export default function BusinessData() {
  const [businessData, setBusinessData] = useState([]);
  const [colorRed, setColorRed] = useState(false);
  const [newRanking, setNewRanking] = useState(false);
  const [favoRanking, setFavoRanking] = useState(false);
  const [appliedRanking, setAppliedRanking] = useState(false);
  const [rewardRanking, setRewardRanking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const getBusinessData = db
      .collection("Businesses")
      .limit(10)
      .onSnapshot((querySnapshot) => {
        const _businessData = querySnapshot.docs.map((doc) => {
          // const likedCount = await db
          //   .collection("Businesses")
          //   .doc(doc.id)
          //   .collection("isLiked")
          //   .get();
          // console.log(likedCount.size);
          // likedCount.forEach((count) => {
          //   console.log(count.size);
          // });
          return {
            businessId: doc.id,
            ...doc.data(),
            // likedCount: likedCount.size,
          };
        });
        setBusinessData(_businessData);
      });
  }, []);

  // useEffect(() => {
  // const handleClickFavo = async (business) => {
  //   const likedDocument = await db
  //     .collection("Businesses")
  //     .doc(business.businessId)
  //     .collection("isLiked")
  //     .where("userId", "==", auth.currentUser.uid)
  //     .get();

  //   const likedDocumentByStudent = await db
  //     .collection("Students")
  //     .doc(auth.currentUser.uid)
  //     .collection("like")
  //     .where("businessId", "==", business.businessId)
  //     .get();

  //   const zeroOrOne = likedDocument.size;

  //   if (zeroOrOne === 0) {
  //     await db
  //       .collection("Businesses")
  //       .doc(business.businessId)
  //       .collection("isLiked")
  //       .add({
  //         userId: auth.currentUser.uid,
  //       });
  //     await db
  //       .collection("Students")
  //       .doc(auth.currentUser.uid)
  //       .collection("like")
  //       .add({
  //         businessId: business.businessId,
  //       });
  //     setIsLiked(true);
  //   } else {
  //     likedDocument.forEach((doc) => {
  //       db.collection("Businesses")
  //         .doc(business.businessId)
  //         .collection("isLiked")
  //         .doc(doc.id)
  //         .delete();
  //     });
  //     likedDocumentByStudent.forEach((doc) => {
  //       db.collection("Students")
  //         .doc(auth.currentUser.uid)
  //         .collection("like")
  //         .doc(doc.id)
  //         .delete();
  //     });
  //     setIsLiked(false);
  //   }
  // };
  // }, []);

  return (
    <>
      <App>
        <COntainer>
          {businessData.map((business) => {
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
        </COntainer>
      </App>
    </>
  );
}

const COntainer = styled.div`
  padding: 0 0 0 20px;
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
