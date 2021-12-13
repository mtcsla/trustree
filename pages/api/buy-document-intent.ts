import Stripe from "stripe";
import md5 from "md5";
import { firestore } from "./lib/firebase-admin";

const stripe = new Stripe(
  process.env.TEST == "0" ? "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" : "sk_test_51J8MtAHh12lHWWSnO5ONNOVxIOzYWsVN1hLD3kAf3Q7FGtN7iNNAspJB3x2HMCnlafkBrCYofrIhQcmozG7NoYsf00E5j84e85",
  { apiVersion: "2020-08-27" }
);

export default async function handler(req, res) {
  const id = md5(req.headers["user-agent"]);

  var today = new Date();
  today.setMinutes(today.getMinutes() + 60);

  if (req.method === "POST") {
    const cancelUrlParamsJson = Object.assign({}, req.body);

    cancelUrlParamsJson.otherHereditaries = JSON.stringify(
      cancelUrlParamsJson.otherHereditaries
    );

    cancelUrlParamsJson.canceled = true;

    const cancelUrlParams = new URLSearchParams(cancelUrlParamsJson).toString();

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: determinePrice(req.body),

            quantity: 1,
          },
        ],
        customer_email: req.body.email,
        locale: "pl",
        metadata: { id, origin: req.headers.origin },
        expires_at: Math.floor(today.getTime() / 1000),
        payment_method_types: ["card"],
        mode: "payment",
        success_url: encodeURI(
          `${req.headers.origin}/zaplacono/?id=${req.body.docId}`
        ),
        cancel_url:
          req.headers.origin + req.body.returnUrl + "?" + cancelUrlParams,
      });

      await firestore
        .collection("requested-docs")
        .doc(id)
        .set(Object.assign({ created: new Date() }, req.body));

      res.status(200).send({ url: session.url });
    } catch (err) {
      console.log(err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).send();
  }
}

export const determinePrice = ({ docId, otherHereditaries }) => {
  if (typeof docId == "string") docId = parseInt(docId);

  switch (docId) {
    case 0:
      return process.env.TEST == "0" ? "price_1K46MvHh12lHWWSnjWHvPGHr" : "price_1JqOEDHh12lHWWSnZzm3sCLt";
    case 1:
      return process.env.TEST == "0" ? "price_1K46N8Hh12lHWWSnJZMmByoA" : "price_1JqOIiHh12lHWWSnRJ95ly9g";
    case 2:
      return process.env.TEST == "0" ? "price_1K46NCHh12lHWWSnIbXbhxJg" : "price_1JqOA8Hh12lHWWSnzed1zYOn";
    case 3:
      throw new Error("Unknown.");
    case 4:
      return otherHereditaries.length
        ? process.env.TEST == "0" ? "price_1K46N4Hh12lHWWSn1Bt0oElX" : "price_1JqOFSHh12lHWWSnQRH2MCfp"
        : process.env.TEST == "0" ? "price_1K46N4Hh12lHWWSnPLYVMq0d" : "price_1JqOFsHh12lHWWSnu4CuC6I9";
    case 5:
      return otherHereditaries.length
        ? process.env.TEST == "0" ? "price_1K46N0Hh12lHWWSnZuFHpXLf" : "price_1JqOH2Hh12lHWWSnXPdyk7QZ"
        : process.env.TEST == "0" ? "price_1K46N0Hh12lHWWSnvwTyga6B" : "price_1JqOH2Hh12lHWWSnkcHsbSBP";

    default:
      throw new Error("Unknown.");
  }
};
export const determineName = ({ docId }) => {
  if (typeof docId == "string") docId = parseInt(docId);

  switch (docId) {
    case 0:
      return "oświadczenie o odrzuceniu spadku";
    case 1:
      return "oświadczenie o przyjęciu spadku";
    case 2:
      return "pozew o zachowek";
    case 3:
      return "wniosek o ustalenie działu spadku";
    case 4:
      return "wniosek o stwierdzenie nabycia praw do spadku wg dziedziczenia ustawowego";
    case 5:
      return "wniosek o stwierdzenie nabycia praw do spadku wg dziedziczenia testamentowego";
  }
};
