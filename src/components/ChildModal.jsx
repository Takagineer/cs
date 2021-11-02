import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import styled from "styled-components";

export default function ChildModal(props) {
  const [open, setOpen] = React.useState(false);
  const { studentId } = props;
  const [studentData, setStudentData] = useState();
  const [studentApplyStatus, setStudentApplyStatus] = useState("");

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
              {/* <table>
                <tbody>
                  <tr>
                    <th>名前</th>
                    <td>
                      {studentData.firstName} {studentData.lastName}
                    </td>
                  </tr>
                  <tr>
                    <th>自己紹介</th>
                    <td>{studentData.introduction}</td>
                  </tr>
                  <tr>
                    <th>年齢</th>
                    <td>{studentData.age}歳</td>
                  </tr>
                  <tr>
                    <th>出身地</th>
                    <td>{studentData.location.label}</td>
                  </tr>
                  <tr>
                    <th>大学</th>
                    <td>{studentData.university}</td>
                  </tr>
                  <tr>
                    <th>年次</th>
                    <td>{studentData.year}</td>
                  </tr>
                </tbody>
              </table> */}
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
                      <A>{data.label}</A>
                      <br />
                    </>
                  );
                })}
              </p>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="審査中"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="残念..."
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="通過"
                />
              </FormGroup>
            </>
          )}
          <br />
          <Button>ステータス確定</Button>
          <br />
          <Button onClick={handleClose}>閉じる</Button>
        </Box>
      </MOdal>
    </React.Fragment>
  );
}

const A = styled.a`
  display: inline-block;
  margin: 0 0.1em 0.6em 0;
  padding: 0.6em;
  line-height: 1;
  text-decoration: none;
  color: #0000ee;
  background-color: #fff;
  border: 1px solid #0000ee;
  border-radius: 2em;
  :before {
    content: "#";
  }
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
