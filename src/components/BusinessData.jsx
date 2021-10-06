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
import { ContactsOutlined } from "@material-ui/icons";

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
    if (favo === false) {
      setFavo(true);
      await db.collection("Likes").add({
        userId: auth.currentUser.uid,
        businessId: business.businessId,
      });
      console.log("赤色に変更する");
    } else {
      setFavo(false);
      const businessRef = await db
        .collection("Likes")
        .where("businessId", "==", business.businessId)
        .where("userId", "==", auth.currentUser.uid)
        .get();
      businessRef.forEach((doc) => {
        db.collection("Likes").doc(doc.id).delete();
      });
      console.log("黒色に変更する");
    }
  };
  return (
    <>
      <COntainer>
        {businessData.map((business) => {
          return (
            <>
              <CArd sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
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
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {/* <Button size="small" color="primary">
                    Share
                  </Button> */}
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
    </>
  );
}

const COntainer = styled.div`
  padding: 0 0 0 20px;
`;

const CArd = styled(Card)`
  padding: 30px 30px 30px 30px;
  border-radius: 20px;
`;
