import { auth } from "@/lib/auth";
import stripe from "@/lib/stripe";
import { getOrCreateCustomerId } from "@/server/stripe/get-customer-id";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const price = process.env.STRIPE_SUBSCRIPTION_PRICE_ID!;

    const { testeId } = await req.json();
   
const session = await auth()

    const userId = session?.user?.id;
    const userEmail = session?.user?.email;
    if (!userId || !userEmail) {
        return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const metadata = {
        testeId,
        price,
        userId,
    }

    //precisamor cria um cliente aaqui
 const customerId = await getOrCreateCustomerId(userId,userEmail);

    //verificando se o cliente existe
    if(!customerId) {
        return NextResponse.json({ error: "Customer not found", status: 500 });
    }



    if (!price) {
        return NextResponse.json({ error: "Price not found", status: 500 });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [{ price,quantity: 1} ],
            mode: "subscription",
            payment_method_types: ["card"],
            success_url: `${req.headers.get("origin")}/success`,
            cancel_url: `${req.headers.get("origin")}/`,
            metadata,
            customer: customerId,
        }) 
        if(!session.url) {
            return NextResponse.json({ error: "Session not found", status: 500 }); 
        }
        return NextResponse.json({ sessionId: session.id });
    }catch (error) {
        console.log(error);
        return NextResponse.error(); 
    }

}