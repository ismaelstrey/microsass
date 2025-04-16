import stripe from "@/lib/stripe";
import { handleStripeSubscriptionDeleted,handleStripePayment,handleStripeSubscription } from "@/server/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
export async function POST(req: NextRequest) {
    console.log(req)
    try {
        const body = await req.text();
        const headersList  = await headers();
        const signature = headersList.get("stripe-signature") as string;
    
        if(!signature || !secret) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }
    const event = await stripe.webhooks.constructEvent(body,signature,secret);
    console.log("evento recebido", event.type)
    switch (event.type) {
        case "checkout.session.completed":     //pagamento confirmado
        const metadata = event.data.object.metadata;
        if(metadata?.price === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID) {
          await handleStripePayment(event)
        }
        if(metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
            await handleStripeSubscription(event)
          }
        
            break;     
            case "checkout.session.expired": //pago com boleto
            console.log("pagamento expirado") //pode enciar um email para o usuario avisar que o pagamento expirou
            break; 
            case "checkout.session.async_payment_succeeded"://boleto pago
            const price = process.env.STRIPE_SUBSCRIPTION_PRICE_ID!;
            console.log("pagamento confirmado com boleto") //pode enciar um email para o usuario avisar que o pagamento foi confirmado
            break; 
            case "checkout.session.async_payment_failed": //boleto não pago
            console.log("pagamento não confirmado com boleto") //pode enciar um email para o usuario avisar que o pagamento não foi confirmado
            break; 
            case "customer.subscription.created": //assinatura criada
            console.log("assinatura criada") //pode enciar um email para o usuario avisar que a assinatura foi criada
            break; 
            case "customer.subscription.updated": //assinatura atualizada
            console.log("assinatura atualizada") //pode enciar um email para o usuario avisar que a assinatura foi atualizada
            break; 
            case "customer.subscription.deleted": //assinatura deletada
            console.log("assinatura deletada") //pode enciar um email para o usuario avisar que a assinatura foi deletada   
            await handleStripeSubscriptionDeleted(event)
            break; 
            default:
            console.log("evento não tratado") //pode enciar um email para o usuario avisar que o evento não foi tratado
            break;   
            } 
            return NextResponse.json({ success: true, status: 200 });
            
        }catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error", status: 500 });
    }
}