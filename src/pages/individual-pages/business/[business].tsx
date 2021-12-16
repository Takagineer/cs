import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import App from "../../../components/App";
import { db, auth } from "../../../firebase";
import Loading from "../../Loading";
import styled from "styled-components";
import Image from "next/image";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@material-ui/core";
import ChildModal from "../../../components/ChildModal";
import { ConfirmationNumberSharp } from "@material-ui/icons";

export default function business() {
  const router = useRouter();
  const isReady = router.isReady;
  const [loading, setLoading] = useState(false);
  const [businessInfo, setBusinessInfo] = useState<any>([]);
  const [businessImageUrl, setBusinessImageUrl] = useState();
  const [businessStatus, setBusinessStatus] = useState("募集中");
  const [logInUser, setLogInUser] = useState<string>();
  const [isApplied, setIsApplied] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [studentId, setStudentId] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

const queryBusiness:any = router.query.business

  const getBusinessInformation = async () => {
    const info = await db
      .collection("Businesses")
      .doc(queryBusiness)
      .get();
    setBusinessInfo(info.data() as any);
  };

  const checkExistWhichCollection = async () => {
    if (auth.currentUser === null) {
      setLogInUser("未ログイン");
    } else {
      const studentsDoc = await db
        .collection("Students")
        .doc(auth.currentUser.uid)
        .get();
      const studentsDataExists = studentsDoc.exists;

      const companiesDoc = await db
        .collection("Companies")
        .doc(auth.currentUser.uid)
        .get();
      const companiesDataExists = companiesDoc.exists;

      if (studentsDataExists === true) {
        setLogInUser("学生");
      } else if (companiesDataExists === true) {
        setLogInUser("企業");
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    getBusinessInformation();
    checkExistWhichCollection();
  }, [isReady]);

  if (!loading) {
    return <Loading />;
  }

  const handleChange = (e) => {
    setBusinessStatus(e.target.value);
  };

  const changeBusinessStatus = (e) => {
    db.collection("Businesses").doc(queryBusiness).set(
      {
        applyStatus: businessStatus,
      },
      { merge: true }
    );
    alert("更新しました");
  };

  const applyWork = async () => {
    const appliedData = await db
      .collection("Businesses")
      .doc(queryBusiness)
      .collection("isApplied")
      .where("studentId", "==", auth.currentUser.uid)
      .get();

    const zeroOrOne = appliedData.size;
    if (zeroOrOne === 0) {
      await db
        .collection("Businesses")
        .doc(queryBusiness)
        .collection("isApplied")
        .doc(auth.currentUser.uid)
        .set(
          {
            studentId: auth.currentUser.uid,
            applyStatusByStudent: "応募中",
            companyName: businessInfo.companyName,
          },
          { merge: true }
        );
      await db
        .collection("Students")
        .doc(auth.currentUser.uid)
        .collection("apply")
        .doc(queryBusiness)
        .set(
          {
            businessId: router.query.business,
            applyStatusByStudent: "応募中",
            companyName: businessInfo.companyName,
          },
          { merge: true }
        );
      alert("応募しました");
    } else {
      setIsApplied(true);
    }
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

  const getStudentInfoAndOpenModal = async () => {
    setOpen(true);
    const studentId = await db
      .collection("Businesses")
      .doc(queryBusiness)
      .collection("isApplied")
      .get();
    const _studentId = [];
    studentId.forEach((student) => {
      _studentId.push({
        studentId: student.id,
      });
    });
    setStudentId(_studentId);
  };

  return (
    <>
      <App>
        <COntainer>
          <br />
          {businessInfo === undefined ? (
            "No information"
          ) : (
            <>
              <TAble>
                <tbody>
                  <tr>
                    {businessInfo.imageURL === undefined ? (
                      <Loading />
                    ) : (
                      <>
                        <td 
                        // colSpan="2"
                        >
                          {businessInfo.imageURL && (
                            <Image
                              src={businessInfo.imageURL}
                              width={600}
                              height={300}
                              objectFit="contain"
                            />
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                  <tr>
                    <TH>会社名</TH>
                    <TD>{businessInfo.companyName}</TD>
                  </tr>
                  <tr>
                    <TH>業務</TH>
                    <TD>{businessInfo.business}</TD>
                  </tr>
                  <tr>
                    <TH>業務内容</TH>
                    <TD>{businessInfo.detail}</TD>
                  </tr>
                  <tr>
                    <TH>勤務場所</TH>
                    <TD>{businessInfo.location}</TD>
                  </tr>
                  <tr>
                    <TH>採用人数</TH>
                    <TD>000-{`${businessInfo.number}人`}-0000</TD>
                  </tr>
                  <tr>
                    <TH>想定報酬額</TH>
                    <TD>{`${businessInfo.reward}/月`}</TD>
                  </tr>
                  <tr>
                    <TH>企業からのメッセージ</TH>
                    <TD>{businessInfo.message}</TD>
                  </tr>
                </tbody>
              </TAble>
            </>
          )}
          <br />
          <br />
          <br />
          {businessInfo === undefined || auth.currentUser === null ? (
            ""
          ) : businessInfo.companyId === auth.currentUser.uid ? (
            <>
              <FormControl
              //  sx={{ m: 1, minWidth: 120 }}
               >
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
              </FormControl>
              <br />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={changeBusinessStatus}
              >
                募集状況更新
              </Button>
              <br />
              <br />
              <Button
                color="primary"
                variant="contained"
                onClick={getStudentInfoAndOpenModal}
              >
                応募者一覧
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box
                  sx={{ ...style, width: 400 }}
                  // variant="contained"
                  color="primary"
                >
                  {studentId.map((student, index) => {
                    return (
                      <h3 key={student.studentId}>
                        学生No
                        <br />
                        {student.studentId}
                        <ChildModal studentId={student.studentId} />
                      </h3>
                    );
                  })}
                </Box>
              </Modal>
              <br />
            </>
          ) : (
            ""
          )}
          <br />
          {logInUser === "学生" && isApplied === false ? (
            <Button variant="contained" color="primary" onClick={applyWork}>
              応募
            </Button>
          ) : (
            <>
              {logInUser === "学生" && isApplied === true ? (
                <div>応募しています。企業からのご連絡をお待ちください。</div>
              ) : (
                ""
              )}
            </>
          )}
        </COntainer>
      </App>
    </>
  );
}

const COntainer = styled.div`
  padding: 100px 0 100px 50px;
  margin: auto;
`;

const TAble = styled.table`
  width: 80 %;
  border-spacing: 0;
  padding: 100px;
`;

const TH = styled.th`
  border-bottom: solid 2px #fb5144;
  width: 30%;
  padding: 20px 0;
`;

const TD = styled.td`
  border-bottom: solid 2px #ddd;
  text-align: center;
  padding: 10px 0;
`;
