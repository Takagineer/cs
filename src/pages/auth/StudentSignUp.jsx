import { Button, Container, TextField, Typography } from "@material-ui/core";
import Link from "next/link";
import React, { useState } from "react";
import App from "../../components/App";
import { auth, db, signOut, signUpWithEmailAndPassword } from "../../firebase";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import styled from "styled-components";
import student from "../individual-pages/student/[student]";

export default function SignUp() {
  const [studentSignUpEmail, setStudentSignUpEmail] = useState("");
  const [studentSignUpPassword, setStudentSignUpPassword] = useState("");
  const [studentSignUpFirstName, setStudentSignUpFirstName] = useState("");
  const [studentSignUpLastName, setStudentSignUpLastName] = useState("");
  const [studentSignUpAge, setStudentSignUpAge] = useState("");
  const [studentSignUpSkill, setStudentSignUpSkill] = useState("");
  const [studentSignUpIntroduction, setStudentSignUpIntroduction] =
    useState("");
  const [studentSignUpUniversity, setStudentSignUpUniversity] = useState("");
  const [studentSignUpYear, setStudentSignUpYear] = useState("");
  const [studentSignUpLocation, setStudentSignUpLocation] = useState("");

  const studentSignUpEmailValue = (e) => {
    setStudentSignUpEmail(e.target.value);
  };
  const studentSignUpPasswordValue = (e) => {
    setStudentSignUpPassword(e.target.value);
  };
  const studentSignUpFirstNameValue = (e) => {
    setStudentSignUpFirstName(e.target.value);
  };
  const studentSignUpLastNameValue = (e) => {
    setStudentSignUpLastName(e.target.value);
  };
  const studentSignUpAgeValue = (e) => {
    setStudentSignUpAge(e.target.value);
  };
  const studentSignUpIntroductionValue = (e) => {
    setStudentSignUpIntroduction(e.target.value);
  };
  const studentSignUpUniversityValue = (e) => {
    setStudentSignUpUniversity(e.target.value);
  };
  const studentSignUpYearValue = (e) => {
    setStudentSignUpYear(e.target.value);
  };
  const studentSignUpSkillValue = (value) => {
    setStudentSignUpSkill(value);
  };
  const studentSignUpLocationValue = (value) => {
    setStudentSignUpLocation(value);
  };

  const studentSignUp = async (e) => {
    const user = await signUpWithEmailAndPassword(
      studentSignUpEmail,
      studentSignUpPassword
    );

    const uid = auth.currentUser.uid;

    //studentSignUp内に記述されてい流、skillが配列に含まれているため、それをスプレッド構文を使用してオブジェクトに分解して、その中から'__isNew__'の記述を削除する。
    const newStudentSignUpSkill = studentSignUpSkill.map((skill) => {
      if ("__isNew__" in skill) {
        delete skill.__isNew__;
        return skill;
      } else {
        return skill;
      }
    });

    //

    const userInitialData = {
      email: studentSignUpEmail,
      password: studentSignUpPassword,
      firstName: studentSignUpFirstName,
      lastName: studentSignUpLastName,
      age: studentSignUpAge,
      introduction: studentSignUpIntroduction,
      university: studentSignUpUniversity,
      year: studentSignUpYear,
      skill: newStudentSignUpSkill,
      location: studentSignUpLocation,
    };

    await db.collection("Students").doc(uid).set(userInitialData);
    alert("登録しました");
    setStudentSignUpEmail("");
    setStudentSignUpPassword("");
    setStudentSignUpFirstName("");
    setStudentSignUpLastName("");
    setStudentSignUpAge("");
    setStudentSignUpSkill("");
    setStudentSignUpIntroduction("");
    setStudentSignUpUniversity("");
    setStudentSignUpYear("");
    setStudentSignUpLocation("");
  };

  return (
    <App>
      {auth.currentUser === null ? (
        <Container component="main" maxWidth="xs">
          <div>
            <br />
            <br />
            <br />
            <h1>学生様新規登録ページ</h1>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email Address"
              autoFocus
              value={studentSignUpEmail}
              onChange={studentSignUpEmailValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              value={studentSignUpPassword}
              onChange={studentSignUpPasswordValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="First Name"
              value={studentSignUpFirstName}
              onChange={studentSignUpFirstNameValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Last Name"
              value={studentSignUpLastName}
              onChange={studentSignUpLastNameValue}
            />
            <TextField
              type="number"
              variant="outlined"
              margin="normal"
              fullWidth
              label="年齢"
              value={studentSignUpAge}
              onChange={studentSignUpAgeValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="自己紹介文"
              autoFocus
              multiline
              rows="6"
              value={studentSignUpIntroduction}
              onChange={studentSignUpIntroductionValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="大学"
              autoFocus
              value={studentSignUpUniversity}
              onChange={studentSignUpUniversityValue}
            />
            <TextField
              type="number"
              variant="outlined"
              margin="normal"
              fullWidth
              label="学年"
              autoFocus
              value={studentSignUpYear}
              onChange={studentSignUpYearValue}
            />
            <CReatableSelect
              placeholder="スキル/資格"
              isMulti
              value={studentSignUpSkill}
              onChange={studentSignUpSkillValue}
              options={skillList}
            />
            <SElect
              placeholder="お住まいの都道府県"
              value={studentSignUpLocation}
              onChange={studentSignUpLocationValue}
              options={prefecture}
            />
            <br />
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={studentSignUp}
            >
              Sign Up
            </Button>
            <br />
            <br />
            <br />
          </div>
        </Container>
      ) : (
        <student />
      )}

      <Link href="/">
        <Button variant="contained" color="primary" onClick={signOut}>
          トップページへ
        </Button>
      </Link>
      {"    "}
      <br />
      <br />
      <br />
      <br />
    </App>
  );
}

const prefecture = [
  { value: "北海道", label: "北海道" },
  { value: "青森県", label: "青森県" },
  { value: "岩手県", label: "岩手県" },
  { value: "宮城県", label: "宮城県" },
  { value: "秋田県", label: "秋田県" },
  { value: "山形県", label: "山形県" },
  { value: "福島県", label: "福島県" },
  { value: "茨城県", label: "茨城県" },
  { value: "栃木県", label: "栃木県" },
  { value: "群馬県", label: "群馬県" },
  { value: "埼玉県", label: "埼玉県" },
  { value: "千葉県", label: "千葉県" },
  { value: "東京都", label: "東京都" },
  { value: "神奈川県", label: "神奈川県" },
  { value: "新潟県", label: "新潟県" },
  { value: "富山県", label: "富山県" },
  { value: "石川県", label: "石川県" },
  { value: "福井県", label: "福井県" },
  { value: "山梨県", label: "山梨県" },
  { value: "長野県", label: "長野県" },
  { value: "岐阜県", label: "岐阜県" },
  { value: "静岡県", label: "静岡県" },
  { value: "愛知県", label: "愛知県" },
  { value: "三重県", label: "三重県" },
  { value: "滋賀県", label: "滋賀県" },
  { value: "京都府", label: "京都府" },
  { value: "大阪府", label: "大阪府" },
  { value: "兵庫県", label: "兵庫県" },
  { value: "奈良県", label: "奈良県" },
  { value: "和歌山県", label: "和歌山県" },
  { value: "鳥取県", label: "鳥取県" },
  { value: "島根県", label: "鳥取県" },
  { value: "岡山県", label: "岡山県" },
  { value: "広島県", label: "広島県" },
  { value: "山口県", label: "山口県" },
  { value: "徳島県", label: "徳島県" },
  { value: "香川県", label: "香川県" },
  { value: "愛媛県", label: "愛媛県" },
  { value: "高知県", label: "高知県" },
  { value: "福岡県", label: "福岡県" },
  { value: "佐賀県", label: "佐賀県" },
  { value: "長崎県", label: "長崎県" },
  { value: "熊本県", label: "熊本県" },
  { value: "大分県", label: "大分県" },
  { value: "宮崎県", label: "宮崎県" },
  { value: "鹿児島県", label: "鹿児島県" },
  { value: "沖縄県", label: "沖縄県" },
];

const skillList = [
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

const SElect = styled(Select)`
  margin-top: 20px;
  margin-bottom: 20px;
`;
