import { Box, Button, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import styled from "styled-components";

export default function ChildModal(props) {
  const [open, setOpen] = React.useState(false);
  const { studentId } = props;
  const [studentData, setStudentData] = useState();

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
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
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
              <h2 id="child-modal-title">
                {studentData.firstName} {studentData.lastName}
              </h2>
              <p id="child-modal-description">{studentData.introduction}</p>
              <p id="child-modal-description">{studentData.age}齢</p>
              <p id="child-modal-description">
                {studentData.location.label}出身
              </p>
              <p id="child-modal-description">{studentData.university}大学</p>
              <p id="child-modal-description">{studentData.year}年生</p>
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
            </>
          )}

          <Button onClick={handleClose}>閉じる</Button>
        </Box>
      </Modal>
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
