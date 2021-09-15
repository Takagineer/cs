import { useRouter } from "next/dist/client/router";
import React from "react";

export default function company() {
  const router = useRouter();
  return (
    <>
      <h1>会社用のダイナミックルーティング用のファイル</h1>
      <h1>ようこそ{router.query.company}さん</h1>
    </>
  );
}
