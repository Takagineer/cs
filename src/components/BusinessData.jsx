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
import Link from "next/Link";
import App from "./App";

export default function BusinessData() {
  const [businessData, setBusinessData] = useState([]);
  const [colorRed, setColorRed] = useState(false);
  const [newRanking, setNewRanking] = useState(false);
  const [favoRanking, setFavoRanking] = useState(false);
  const [appliedRanking, setAppliedRanking] = useState(false);
  const [rewardRanking, setRewardRanking] = useState(false);

  useEffect(() => {
    const getBusinessData = db
      .collection("Businesses")
      .onSnapshot((querySnapshot) => {
        const _businessData = querySnapshot.docs.map((doc) => {
          return {
            businessId: doc.id,
            ...doc.data(),
          };
        });
        setBusinessData(_businessData);
      });
  }, []);

  const handleClickFavo = async (business) => {
    const likedDocument = await db
      .collection("Likes")
      .where("businessId", "==", business.businessId)
      .where("userId", "==", auth.currentUser.uid)
      .get();
    console.log({ businessId: business.businessId });
    console.log({ userId: auth.currentUser.uid });
    console.log({ likedDocumentの存在確認: likedDocument.exists });
    console.log({ likedDocumentの値: likedDocument });

    likedDocument.forEach((doc) => {
      console.log(doc.data());
      console.log(doc.exists);
      if (likedDocument === undefined) {
        db.collection("Likes").add({
          userId: auth.currentUser.uid,
          businessId: business.businessId,
        });
        console.log("追加完了");
      } else {
        console.log("削除処理");
        // db.collection("Likes").doc(doc.id).delete();
      }
    });

    // likedCollection.forEach((doc) => {
    //   console.log(doc.data());
    //   console.log(doc.exists);

    //   if (doc.exists === true) {
    //     db.collection("Likes").doc(doc.id).delete();
    //     console.log("削除しました");
    //   } else {
    //     db.collection("Likes").add({
    //       userId: auth.currentUser.uid,
    //       businessId: business.businessId,
    //     });
    //   }
    // });
  };

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
                        <Typography gutterBottom variant="h5" component="div">
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
                  <CardActions>
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
                    </IconButton>
                  </CardActions>
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
