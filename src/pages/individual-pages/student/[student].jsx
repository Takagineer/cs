import { useRouter } from "next/router";
import React from "react";

export default function student() {
  const router = useRouter();
  return (
    <div>
      <h1>学生用のダイナミックルーティング用のファイル</h1>
      <h1>ようこそ{router.query.student}さん</h1>
    </div>
  );
}
