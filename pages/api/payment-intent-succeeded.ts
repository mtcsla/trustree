import { createDocument } from "@apicomponents/documentReducer";
import { firestore } from "./lib/firebase-admin";
import sendEmail from "@apicomponents/functions/sendEmail";

import * as md5 from "md5";

export default async (req, res) => {
  try {
    if (req.body.type === "payment_intent.succeeded") {
      const paymentIntent = req.body.data.object;
      let metadata = (
        await firestore
          .collection("stripe-metadata")
          .doc(paymentIntent.metadata.id)
          .get()
      ).data();

      await firestore
        .collection("stripe-metadata")
        .doc(paymentIntent.metadata.id)
        .delete();

      for (var key in metadata) {
        metadata[key] = JSON.parse(metadata[key]);
      }

      const { document, filename, name } = createDocument(
        metadata.document,
        metadata
      );

      const ref = firestore
        .collection("documents")
        .doc(md5(metadata.hereditary.email))
        .collection("owned");

      const doc = await ref.add({
        document: document,
        filename: filename,
        name: name,
        date: new Date(),
      });

      sendEmail({
        to: metadata.hereditary.email,
        subject: name,
        html: document,
      })
        .then(() => res.status(200).send({}))
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        });
    } else res.status(200).send({});
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export function html(strings, ...tags) {
  let str = strings[0];
  for (let i = 0; i < tags.length; i++) {
    str += tags[i] + strings[i + 1];
  }
  return str;
}
