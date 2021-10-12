import { firestore } from "./api/lib/firebase-admin";

import React from "react";
import { Card } from "@blueprintjs/core";
import dynamic from "next/dynamic";

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
    },
  };
};

const html2pdf: any = dynamic(() => import("html2pdf.js"), {
  ssr: false,
});

export default function Odbierz({
  html,
  filename,
}: {
  html: string;
  filename: string;
}) {
  const [pdf, setPdf] = React.useState(null);

  React.useEffect(() => {
    setPdf(html2pdf(html));
  }, []);
  React.useEffect(() => {
    if (pdf) {
      pdf.save(filename);
    }
  }, [pdf]);

  return (
    <Card
      id="document"
      className="p-6"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    ></Card>
  );
}
