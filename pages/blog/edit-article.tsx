import { useRouter } from "next/dist/client/router";
import React from "react";

export default function EditArticle() {
  const router = useRouter();
  const { article } = router.query;

  return <></>;
}
