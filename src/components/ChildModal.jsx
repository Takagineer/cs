import { Box, Button, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

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
            </>
          )}
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>

          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
