import { mongooseConnect } from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK); 
import {buffer} from 'micro';

const endpointSecret = "whsec_61abca0b4380037e6ea723c8046882ee012358918a11c71434b78ad58169045c";

export default async function handler(req, res){
  await mongooseConnect();

  const sig = req.headers['stripe-signature'];

  let event;
  console.log(`muie afara`)
  try {
    event = stripe.webhooks.constructEvent((await buffer(req)).toString(), sig, endpointSecret);
    console.log(event)

  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      console.log(`muie inauntru`, data);

      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if(orderId && paid){
        await Order.findByIdAndUpdate(orderId,{
          paid:true,
        })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send('ok');
};

export const config = {
  api: {bodyparser: false,
    externalResolver: true,
  }
}