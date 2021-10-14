import atom from "recoil";

export const companyState = atom({
  key: "companyState",
  default: { isCompanyState: false },
});
