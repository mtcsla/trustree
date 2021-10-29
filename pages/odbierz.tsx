import { firestore } from "./api/lib/firebase-admin";

import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/dist/client/router";
const Odbierz = dynamic(() => import("../components/Odbierz"), { ssr: false });

function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

export const getServerSideProps = async ({ query }) => {
  const { id, col } = query;

  const document = await firestore
    .collection("documents")
    .doc(col)
    .collection("owned")
    .doc(id)
    .get();

  const data = document.data();

  return {
    props: {
      html: data.document,
      filename: data.filename,
      name: data.name,
      id: data.docId,
    },
  };
};

const OdbierzPage = ({
  html,
  filename,
  name,
  docId,
}: {
  html: string;
  filename: string;
  name: string;
  docId: number;
}) => {
  const router = useRouter();
  React.useEffect(() => {
    sessionStorage.setItem(
      "document",
      JSON.stringify({
        html,
        filename,
        name,
        docId,
      })
    );
    router.push("/drukuj");
  }, []);
  return null;
};

export default dynamic(Promise.resolve(OdbierzPage), { ssr: false });
