import { useRouter } from "next/dist/client/router";
import React from "react";

export default function business() {
  const router = useRouter();
  const isReady = router.isReady;
  return (
    <>
      <h1>業務用のルーティングページです</h1>
      {router.query.business}
    </>
  );
}
