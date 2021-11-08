import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import styled from "styled-components";
import { delBasePath } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";

export default function ChildModal(props) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { studentId } = props;
  const [studentData, setStudentData] = useState();
  const [applyStatusByStudent, setApplyStatusByStudent] = useState("審査中");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const getStudentInfo = async () => {
    const studentInfo = await db.collection("Students").doc(studentId).get();
    setStudentData(studentInfo.data());
  };

  useEffect(() => {
    getStudentInfo();
  }, []);

  const selectStatus = (e) => {
    setApplyStatusByStudent(e.target.value);
  };

  const check = async () => {
    await db
      .collection("Businesses")
      .doc(router.query.business)
      .collection("isApplied")
      .doc(studentId)
      .set(
        {
          applyStatusByStudent: applyStatusByStudent,
        },
        { merge: true }
      );

    //学生側のステータスの変更記述
    await db
      .collection("Students")
      .doc(studentId)
      .collection("apply")
      .doc(router.query.business)
      .set(
        {
          applyStatusByStudent: applyStatusByStudent,
        },
        { merge: true }
      );
  };

  return (
    <React.Fragment>
      <br />
      <Button onClick={handleOpen}>詳細ページ</Button>
      <MOdal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          {studentData === undefined ? (
            "お待ちください"
          ) : (
            <>
              <H2 id="child-modal-title">
                {studentData.firstName} {studentData.lastName}
              </H2>
              <P id="child-modal-description">{studentData.introduction}</P>
              <P id="child-modal-description">{studentData.age}歳</P>
              <P id="child-modal-description">
                {studentData.location.label}出身
              </P>
              <P id="child-modal-description">{studentData.university}</P>
              <P id="child-modal-description">{studentData.year}年生</P>
              <p id="child-modal-description">
                {studentData.skill.map((data) => {
                  return (
                    <>
                      <A key={data.label}>{data.label}</A>
                      <br />
                    </>
                  );
                })}
              </p>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  選考ステータス変更
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Age"
                  value={applyStatusByStudent}
                  onChange={selectStatus}
                >
                  <MenuItem value={"審査中"}>審査中</MenuItem>
                  <MenuItem value={"残念..."}>残念...</MenuItem>
                  <MenuItem value={"通過"}>通過</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
          <br />
          <Button onClick={check}> ステータス確定</Button>
          <br />
          <Button onClick={handleClose}>閉じる</Button>
        </Box>
      </MOdal>
    </React.Fragment>
  );
}

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

const H2 = styled.h2`
  border-bottom: solid 2px #fb5144;
  padding: 100px 0 20px 20px;
`;

const P = styled.p`
  border-bottom: solid 2px #fb5144;
  padding: 0 0 20px 20px;
`;

const MOdal = styled(Modal)`
  overflow-y: scroll;
`;
