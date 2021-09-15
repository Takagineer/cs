import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
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
        <p>ビジネスデータ</p>
        <UL>
          {businessData.map((business) => {
            return (
              <LI key={business.businessId}>
                <br />
                業務：{business.business}
                <br />
                勤務場所：{business.location}
                <br />
                想定報酬額：{`${business.reward}/月`}
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
                {"数を表示する"}
              </LI>
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
  border: solid 5px #59b9c6;
`;
