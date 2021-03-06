import React, { useEffect, useState } from "react";
import App from "../../components/App";
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { auth, db } from "../../firebase";
import router from "next/router";

export default function UpdateStudentInformation() {
  const [updateStudentFirstName, setUpdateStudentFirstName] = useState();
  const [updateStudentLastName, setUpdateStudentLastName] = useState();
  const [updateStudentAge, setUpdateStudentAge] = useState();
  const [updateStudentIntroduction, setUpdateStudentIntroduction] = useState();
  const [updateStudentUniversity, setUpdateStudentUniversity] = useState();
  const [updateStudentYear, setUpdateStudentYear] = useState();
  const [updateStudentSkill, setUpdateStudentSkill] = useState();
  const [updateStudentLocation, setUpdateStudentLocation] = useState();

  const updateStudentFirstNameValue = (e) => {
    setUpdateStudentFirstName(e.target.value);
  };
  const updateStudentLastNameValue = (e) => {
    setUpdateStudentLastName(e.target.value);
  };
  const updateStudentAgeValue = (e) => {
    setUpdateStudentAge(e.target.value);
  };
  const updateStudentIntroductionValue = (e) => {
    setUpdateStudentIntroduction(e.target.value);
  };
  const updateStudentUniversityValue = (e) => {
    setUpdateStudentUniversity(e.target.value);
  };
  const updateStudentYearValue = (e) => {
    setUpdateStudentYear(e.target.value);
  };
  const updateStudentSkillValue = (value) => {
    setUpdateStudentSkill(value);
  };
  const updateStudentLocationValue = (value) => {
    setUpdateStudentLocation(value);
  };

  const getStudentInformation = async () => {
    const userInformation = await db
      .collection("Students")
      .doc(auth.currentUser.uid)
      .get();

    setUpdateStudentFirstName(userInformation.data().firstName);
    setUpdateStudentLastName(userInformation.data().lastName);
    setUpdateStudentAge(userInformation.data().age);
    setUpdateStudentIntroduction(userInformation.data().introduction);
    setUpdateStudentUniversity(userInformation.data().university);
    setUpdateStudentYear(userInformation.data().year);
    setUpdateStudentSkill(userInformation.data().skill);
    setUpdateStudentLocation(userInformation.data().location);
  };

  const updateStudentInformation = async () => {
    const newUpdateStudentSkill = updateStudentSkill.map((skill) => {
      if ("__isNew__" in skill) {
        delete skill.__isNew__;
        return skill;
      } else {
        return skill;
      }
    });
    await db.collection("Students").doc(auth.currentUser.uid).set(
      {
        firstName: updateStudentFirstName,
        lastName: updateStudentLastName,
        age: updateStudentAge,
        introduction: updateStudentIntroduction,
        university: updateStudentUniversity,
        year: updateStudentYear,
        skill: newUpdateStudentSkill,
        location: updateStudentLocation,
      },
      { merge: true }
    );
    alert("データの更新をしました");
    await router.push(`/individual-pages/student/${auth.currentUser.uid}`);
  };

  useEffect(() => {
    getStudentInformation();
  }, []);

  return (
    <>
      <App>
        <COntainer>
          <br />
          <DIv>
            <h1>登録情報変更</h1>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="First Name"
              value={updateStudentFirstName}
              onChange={updateStudentFirstNameValue}
              focused
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Last Name"
              value={updateStudentLastName}
              onChange={updateStudentLastNameValue}
              focused
            />
            <TextField
              type="number"
              variant="outlined"
              margin="normal"
              fullWidth
              label="年齢"
              value={updateStudentAge}
              onChange={updateStudentAgeValue}
              focused
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="自己紹介文"
              autoFocus
              multiline
              rows="6"
              value={updateStudentIntroduction}
              onChange={updateStudentIntroductionValue}
              focused
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="大学"
              autoFocus
              value={updateStudentUniversity}
              onChange={updateStudentUniversityValue}
              focused
            />
            <TextField
              type="number"
              variant="outlined"
              margin="normal"
              fullWidth
              label="学年"
              autoFocus
              value={updateStudentYear}
              onChange={updateStudentYearValue}
              focused
            />
            <CReatableSelect
              placeholder="スキル/資格"
              isMulti
              value={updateStudentSkill}
              onChange={updateStudentSkillValue}
              options={skillList}
            />
            <SElect
              placeholder="お住まいの都道府県"
              value={updateStudentLocation}
              onChange={updateStudentLocationValue}
              options={prefecture}
            />
            <br />
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={updateStudentInformation}
            >
              更新
            </Button>
          </DIv>
        </COntainer>
      </App>
    </>
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

const COntainer = styled.div`
  padding: 100px 0 100px 50px;
  margin: ;
`;

const CReatableSelect = styled(CreatableSelect)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SElect = styled(Select)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DIv = styled.div`
  width: 40%;
  margin: 20px auto;
`;
