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
  const [favo, setFavo] = useState(false);
  const [colorRed, setColorRed] = useState(false);

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
    //Likesコレクションから、business.businessIdで検索をかける。
    //取得したドキュメントに、現在ログインしているユーザーのIDが含まれているか確認する。
    //※上記２行は、１行で短縮可能
    //あれば、いいねマークを赤く表示し、その横にカウントを表示する。
    //なければ、いいねマークを黒く表示し、その横にカウントを表示する。
    console.log("開始します");
    const likedDocument = await db
      .collection("Likes")
      .where("businessId", "==", business.businessId)
      .where("userId", "==", auth.currentUser.uid)
      .get();

    console.log("データの取得完了");

    likedDocument.forEach((doc) => {
      console.log(doc.data());
      console.log(doc.exists);

      if (doc.exists) {
        console.log("削除する記述");
      } else {
        console.log("追加する記述");
      }
    });

    // likedDocument.forEach((doc) => {
    //   console.log(doc.data());
    //   console.log(doc.exists);
    //   //上記の記述でなければundefinedになる。
    //   // console.log(likedDocument.exists);

    //   if (doc.exists) {
    //     console.log("消します");
    //     db.collection("Likes").doc(doc.id).delete();
    //   } else {
    //     console.log("追加します");
    //     db.collection("Likes").add({
    //       userId: auth.currentUser.uid,
    //       businessId: business.businessId,
    //     });
    //   }
    // });

    // if (likedDocument.exists) {
    //   console.log("ありますね");
    //   console.log(likedDocument);
    //   const businessRef = await db
    //     .collection("Likes")
    //     .where("businessId", "==", business.businessId)
    //     .where("userId", "==", auth.currentUser.uid)
    //     .get();
    //   businessRef.forEach((doc) => {
    //     db.collection("Likes").doc(doc.id).delete();
    //   });
    //   console.log("黒色に変更する");
    // } else {
    //   console.log("ないですね");
    //   console.log(likedDocument);
    //   await db.collection("Likes").add({
    //     userId: auth.currentUser.uid,
    //     businessId: business.businessId,
    //   });
    //   console.log("赤色に変更する");
    // }
    // if (favo === false) {
    //   setFavo(true);
    //   await db.collection("Likes").add({
    //     userId: auth.currentUser.uid,
    //     businessId: business.businessId,
    //   });
    //   console.log("赤色に変更する");
    // } else {
    //   setFavo(false);
    //   const businessRef = await db
    //     .collection("Likes")
    //     .where("businessId", "==", business.businessId)
    //     .where("userId", "==", auth.currentUser.uid)
    //     .get();
    //   businessRef.forEach((doc) => {
    //     db.collection("Likes").doc(doc.id).delete();
    //   });
    //   console.log("黒色に変更する");
    // }
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
