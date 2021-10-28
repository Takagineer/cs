import { Container, Button, makeStyles, TextField } from "@material-ui/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import App from "../../components/App";
import { auth, db, storage } from "../../firebase";
import CreatableSelect from "react-select/creatable";
import styled from "styled-components";
import Loading from "../Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
export default function CompanyBusinesses() {
  const [business, setBusiness] = useState("");
  const [detail, setDetail] = useState("");
  const [reward, setReward] = useState("");
  const [number, setNumber] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState([]);
  const [fileUrl, setFileUrl] = useState();
  const [applyStatus, setApplyStatus] = useState("");

  const addBusinessData = async () => {
    if (
      !business ||
      !detail ||
      !reward ||
      !number ||
      !location ||
      !skill ||
      !message ||
      !image
    ) {
      alert("空欄を埋めてください");
      return;
    }

    const URL = `images/${auth.currentUser.uid}/${image.name}`;
    const storageRef = storage.ref().child(URL);
    await storageRef.put(image);
    setFileUrl(await storageRef.getDownloadURL());
  };

  const businessValue = (e) => {
    setBusiness(e.target.value);
  };
  const detailValue = (e) => {
    setDetail(e.target.value);
  };
  const rewardValue = (e) => {
    setReward(e.target.value);
  };
  const numberValue = (e) => {
    setNumber(e.target.value);
  };
  const locationValue = (e) => {
    setLocation(e.target.value);
  };
  const messageValue = (e) => {
    setMessage(e.target.value);
  };
  const skillValue = (value) => {
    setSkill(value);
  };
  const classes = useStyles();

  const onSubmit = (e) => {
    e.prevent.default();
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    if (fileUrl === undefined) {
      return;
    } else {
      const newBusinessSkill = skill.map((skill) => {
        if ("__isNew__" in skill) {
          delete skill.__isNew__;
          return skill;
        } else {
          return skill;
        }
      });

      db.collection("Businesses").add({
        business: business,
        detail: detail,
        reward: reward,
        number: number,
        location: location,
        skill: newBusinessSkill,
        message: message,
        companyId: auth.currentUser.uid,
        imageURL: fileUrl,
        applyStatus: "募集中",
      });

      alert("募集をかけました");
      setBusiness("");
      setDetail("");
      setReward("");
      setNumber("");
      setLocation("");
      setSkill("");
      setMessage("");
      setImage("");
    }
  }, [fileUrl]);

  return (
    <>
      <App>
        <Container component="main" maxWidth="xs">
          <br />
          <br />
          <br />
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="募集業務"
              autoFocus
              value={business}
              onChange={businessValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="業務内容"
              autoFocus
              value={detail}
              onChange={detailValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="想定報酬額"
              autoFocus
              value={reward}
              onChange={rewardValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="募集人数"
              autoFocus
              value={number}
              onChange={numberValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="勤務場所"
              autoFocus
              value={location}
              onChange={locationValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="メッセージ"
              autoFocus
              multiline
              rows="5"
              value={message}
              onChange={messageValue}
            />
            <CReatableSelect
              placeholder="スキル/資格"
              isMulti
              value={skill}
              onChange={skillValue}
              options={skillList}
            />

            <br />
          </form>

          <Button variant="contained" color="label">
            <input type="file" onChange={handleImage} />
          </Button>
          <br />
          <br />

          <br />
          <br />
          <Button variant="contained" color="primary" onClick={addBusinessData}>
            募集
          </Button>
          <br />
          <br />
          <br />
          <Link href="/">
            <Button variant="contained" color="secondary">
              トップページへ
            </Button>
          </Link>
        </Container>
      </App>
    </>
  );
}

const skillList = [
  { value: "なし", label: "特になし" },
  { value: "英検", label: "英検２級" },
  { value: "秘書", label: "秘書検定" },
  { value: "企業診断士", label: "中小企業診断士" },
  { value: "博士号", label: "博士号" },
  { value: "司法書士", label: "司法書士" },
  { value: "社労士", label: "社労士" },
  { value: "自動車免許", label: "普通自動車免許" },
  { value: "TOEIC", label: "TOEIC800点以上" },
  { value: "TOEIC", label: "TOEIC900点以上" },
];

const CReatableSelect = styled(CreatableSelect)`
  margin-top: 20px;
  margin-bottom: 20px;
`;
