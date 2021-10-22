import { url } from "inspector";
import Stripe from "stripe";
import md5 from "md5";
import { firestore } from "./lib/firebase-admin";

const stripe = new Stripe(
  "sk_test_51J8MtAHh12lHWWSnO5ONNOVxIOzYWsVN1hLD3kAf3Q7FGtN7iNNAspJB3x2HMCnlafkBrCYofrIhQcmozG7NoYsf00E5j84e85",
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
            amount: determinePrice(req.body),
            currency: "pln",
            name: "Wykonanie dokumentu",
            description: determineName(req.body),
            quantity: 1,
          },
        ],
        customer_email: req.body.email,
        locale: "pl",
        metadata: { id, origin: req.headers.origin },
        expires_at: Math.floor(today.getTime() / 1000),
        payment_method_types: ["card", "p24"],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url:
          req.headers.origin + req.body.returnUrl + "?" + cancelUrlParams,
      });

      await firestore
        .collection("requested-docs")
        .doc(id)
        .set(Object.assign({ created: new Date() }, req.body));

      res.status(200).send({ url: session.url });
    } catch (err) {
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
      return 2000;
    case 1:
      return 2000;
    case 2:
      return 30000;
    case 3:
      return 30000;
    case 4:
      return otherHereditaries.length ? 10000 : 5000;
    case 5:
      return otherHereditaries.length ? 10000 : 5000;

    default:
      return 100000;
  }
};
export const determineName = ({ docId }) => {
  if (typeof docId == "string") docId = parseInt(docId);

  switch (docId) {
    case 0:
      return "Oświadczenie o odrzuceniu spadku";
    case 1:
      return "Oświadczenie o przyjęciu spadku";
    case 2:
      return "Pozew o zachowek";
    case 3:
      return "Wniosek o ustalenie działu spadku";
    case 4:
      return "Wniosek o stwierdzenie nabycia praw do spadku wg dziedziczenia ustawowego";
    case 5:
      return "Wniosek o stwierdzenie nabycia praw do spadku wg dziedziczenia testamentowego";
  }
};
