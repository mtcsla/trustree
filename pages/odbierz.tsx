import * as pdf from "html2pdf.js";
import parse from "html-react-parser";
import { firestore } from "./api/lib/firebase-admin";
import { CardForm } from "./kalkulator/index";

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

export default function Odbierz({ html, filename }) {
  return <CardForm dangerouslySetInnerHTML={{ __html: html }}></CardForm>;
}
