import { createDocument } from "./apicomponents/documentReducer";
import { firestore } from "./lib/firebase-admin";
import sendEmail from "./apicomponents/functions/sendEmail";
import util from "util";

import md5 from "md5";
import { getMailTemplate } from "./apicomponents/functions/mailTemplate";

export default async (req, res) => {
  try {
    if (req.body.type === "checkout.session.completed") {
      const sessionDocId = req.body.data.object.metadata.id;
      const sessionDocOrigin = req.body.data.object.metadata.origin;

      let metadata = (
        await firestore.collection("requested-docs").doc(sessionDocId).get()
      ).data();
      try {
        await firestore.collection("requested-docs").doc(sessionDocId).delete();
      } catch {}

      const { document, filename, name } = createDocument(
        metadata.docId,
        metadata
      );

      const ref = firestore
        .collection("documents")
        .doc(md5(metadata.email))
        .collection("owned");

      const { id } = await ref.add({
        document: document,
        filename: filename,
        name: name,
        docId: metadata.docId,
        date: new Date(),
      });

      sendEmail({
        to: metadata.email,
        subject: name,
        html: getMailTemplate({
          id: id,
          origin: sessionDocOrigin,
          ...metadata,
        }),
      })
        .then(() => res.status(200).send({}))
        .catch((err) => {
          console.log(
            console.log(
              util.inspect(err, {
                showHidden: false,
                depth: null,
                colors: true,
              })
            )
          );
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
