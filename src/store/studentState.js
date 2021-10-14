import atom from "recoil";

export const studentState = atom({
  key: "studentState",
  default: { uid: "" },
});
