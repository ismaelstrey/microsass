import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
   
    const { testeId, userEmail } = await req.json();
    const metadata = {
        testeId,
        userEmail 
    }
    const price = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!;

    if(!price) {
        return NextResponse.json({error: "Price not found", status: 500}); 
    }

    try {
        const session = await stripe.checkout.sessions.create({
            customer: testeId,
            mode: 'payment',
            payment_method_types: ['card','paypal','boleto'],
            line_items: [{ price: price, quantity: 1  } ],
            success_url: `${req.headers.get("origin")}/sucess`,
            cancel_url: `${req.headers.get("origin")}/`,
            ...(userEmail && {customer_email: userEmail}),
           metadata
        })

        if(!session) {
            return NextResponse.json({error: "Session not found", status: 500});
        }
        return NextResponse.json({session, status: 200});
     } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Error creating session", status: 500});
    }
}