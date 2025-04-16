import { db } from "@/lib/firebase";
import "server-only"
import Stripe from "stripe";

export async function handleStripeSubscriptionDeleted(event: Stripe.CustomerSubscriptionDeletedEvent) {
    if(event.data.object.status === "canceled") {
      console.log("pagamento confirmado Liberar acesso");
    
      const custumerId = event.data.object.customer;
  
    const userRef = await db.collection("users").where("stripeCustomerId", "==", custumerId).get();
    if(userRef.empty) {
      console.log("usuário não encontrado");
      //TODO: enviar email para o usuário informando que não foi possível liberar o acesso
      return;
    }
    const userId = userRef.docs[0].id;
    
   await db.collection("users").doc(userId).update({  
      subscriptionStatus: "inactive",
    }
  )
    }
    }