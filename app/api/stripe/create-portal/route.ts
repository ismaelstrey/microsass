import { auth } from "@/lib/auth";
import { db } from "@/lib/firebase";
import stripe from "@/lib/stripe";
import { getOrCreateCustomerId } from "@/server/stripe/get-customer-id";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const session = await auth()
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;
    if (!userId || !userEmail) {
        return NextResponse.json({ error: "Unauthorized", status: 401 });
    }


    try {
        const userRef = db.collection("users").doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return NextResponse.json({ error: "User not found", status: 404 });
       
        }
        const customerId = await getOrCreateCustomerId(userId,userEmail);

        if (!customerId) {
            return NextResponse.json({ error: "Customer ID not found", status: 404 });
        }

        console.log({customerId})
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${req.headers.get("origin")}/dashboard`,
        });
        console.log({portalSession})
        if (!portalSession.url) {
            return NextResponse.json({ error: "Portal session URL not found", status: 404 }); 
        }

        return NextResponse.json({ url: portalSession.url },{status: 200});
    }catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error", status: 500 },{status: 500});
    }

}