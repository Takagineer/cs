import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import App from "../../../components/App";
import { db, auth } from "../../../firebase";
import Loading from "../../Loading";
import styled from "styled-components";
import Image from "next/image";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

export default function business() {
  const router = useRouter();
  const isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  const [businessInfo, setBusinessInfo] = useState([]);
  const [businessImageUrl, setBusinessImageUrl] = useState();
  const [businessStatus, setBusinessStatus] = useState("募集中");

  const getBusinessInformation = async () => {
    const info = await db
      .collection("Businesses")
      .doc(router.query.business)
      .get();
    setBusinessInfo(info.data());
  };

  useEffect(() => {
    setLoading(true);
    getBusinessInformation();
  }, [isReady]);

  if (!loading) {
    return <Loading />;
  }

  const handleChange = (e) => {
    setBusinessStatus(e.target.value);
  };

  const changeBusinessStatus = (e) => {
    db.collection("Businesses").doc(router.query.business).set(
      {
        applyStatus: businessStatus,
      },
      { merge: true }
    );
    alert("更新しました");
    console.log(businessInfo);
  };

  return (
    <>
      <App>
        <COntainer>
          <br />
          <h1>業務詳細ページ</h1>
          <br />
          {businessInfo === undefined ? (
            "No information"
          ) : (
            <>
              {businessInfo.imageURL && (
                <Image src={businessInfo.imageURL} width={400} height={300} />
              )}
              <h1>業務 ：{businessInfo.business}</h1>
              <h1>業務内容 ：{businessInfo.detail}</h1>
              <h1>勤務場所 ：{businessInfo.location}</h1>
              <h1>採用人数 ：{`${businessInfo.number}人`}</h1>
              <h1>想定報酬額 ：{`${businessInfo.reward}/月`}</h1>
            </>
          )}
          {businessInfo === undefined || auth.currentUser === null ? (
            ""
          ) : businessInfo.companyId === auth.currentUser.uid ? (
            <>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  募集状況
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Age"
                  onChange={handleChange}
                  value={businessStatus}
                >
                  <MenuItem value={"募集中"}>募集中</MenuItem>
                  <MenuItem value={"締め切り間近"}>締め切り間近</MenuItem>
                  <MenuItem value={"募集締め切り"}>募集終了</MenuItem>
                </Select>
                <FormHelperText>
                  一度募集締め切りに変更し、更新してしまうと変更できなくなります。
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={changeBusinessStatus}
              >
                更新
              </Button>
            </>
          ) : (
            "ボタン非表示"
          )}
          <br />
          <br />

          <br />
          <br />
          <Button variant="contained" color="primary">
            応募
          </Button>
        </COntainer>
      </App>
    </>
  );
}

const COntainer = styled.div`
  padding: 100px 0 100px 50px;
  margin: auto;
`;
