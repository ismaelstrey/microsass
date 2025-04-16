import { db } from "@/lib/firebase";
import "server-only";
import { Stripe } from "stripe";


export async function handleStripePayment(event: Stripe.CheckoutSessionCompletedEvent) {
if(event.data.object.payment_status === "paid") {
  console.log("pagamento confirmado Liberar acesso");
  const metadata = event.data.object.metadata;
  
  const userId = metadata?.userId;
  if(!userId) {
    console.log("usuário não encontrado");
    //TODO: enviar email para o usuário informando que não foi possível liberar o aces
    return;
  }
  
 await db.collection("users").doc(userId).update({
    stripeSubscriptionId: event.data.object.subscription,
    subscriptionStatus: "active",
  }
)

}
}