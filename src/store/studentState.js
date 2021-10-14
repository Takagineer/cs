import atom from "recoil";

export const studentState = atom({
  key: "studentState",
  default: { isStudentAdmin: false },
});
