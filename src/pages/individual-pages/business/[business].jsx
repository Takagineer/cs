import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import App from "../../../components/App";
import { db } from "../../../firebase";
import Loading from "../../Loading";
import styled from "styled-components";
import Image from "next/image";
import { auth } from "../../../firebase";
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

  const getBusinessInformation = async () => {
    const info = await db
      .collection("Businesses")
      .doc(router.query.business)
      .get();
    setBusinessInfo(info.data());
  };

  const getBusinessImageUrl = async () => {
    console.log("画像データの取得");
  };

  useEffect(() => {
    setLoading(true);
    getBusinessInformation();
  }, [isReady]);

  if (!loading) {
    return <Loading />;
  }

  const handleChange = (e) => {
    console.log(
      "グローバルステートで管理しているstateの値を変更できるようにする"
    );
  };

  return (
    <>
      <App>
        <COntainer>
          <br />
          <br />
          <h1>業務詳細ページ</h1>
          <br />

          {businessInfo === undefined ? (
            "No information"
          ) : (
            <>
              <img src={businessInfo.imageURL} width={400} height={300} />
              {/* <Image src={businessInfo.imageURL} width={400} height={300} /> */}
              <h1>業務 ：{businessInfo.business}</h1>
              <h1>業務内容 ：{businessInfo.detail}</h1>
              <h1>勤務場所 ：{businessInfo.location}</h1>
              <h1>採用人数 ：{`${businessInfo.number}人`}</h1>
              <h1>想定報酬額 ：{`${businessInfo.reward}/月`}</h1>
            </>
          )}

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              募集状況
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"募集中"}>募集中</MenuItem>
              <MenuItem value={"締め切り間近"}>Twenty</MenuItem>
              <MenuItem value={"募集締め切り"}>Thirty</MenuItem>
            </Select>
            <FormHelperText>ステータスを変更してください</FormHelperText>
          </FormControl>
          <br />
          <Button variant="contained" color="primary">
            更新
          </Button>
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
