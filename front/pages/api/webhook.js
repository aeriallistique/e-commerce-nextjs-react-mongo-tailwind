import { mongooseConnect } from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK); 
import {buffer} from 'micro';

const endpointSecret = "whsec_61abca0b4380037e6ea723c8046882ee012358918a11c71434b78ad58169045c";

export default async function handler(req, res){
  await mongooseConnect();

  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded)
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

export const config = {
  api: {bodyparser: false,}
}