import Stripe from "stripe";
import { firestore } from "./lib/firebase-admin";

const stripe = new Stripe(
  "sk_test_51J8MtAHh12lHWWSnO5ONNOVxIOzYWsVN1hLD3kAf3Q7FGtN7iNNAspJB3x2HMCnlafkBrCYofrIhQcmozG7NoYsf00E5j84e85",
  { apiVersion: "2020-08-27" }
);

const calculateOrderAmount = (document: string) => {
  return 200;
};

export default async (req, res) => {
  try {
    for (var key in req.body.metadata) {
      req.body.metadata[key] = JSON.stringify(req.body.metadata[key]);
    }
    const { id } = await firestore
      .collection("stripe-metadata")
      .add(req.body.metadata);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(req.body.metadata.document),
      currency: "pln",
      metadata: {
        id,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).send({});
  }
};
