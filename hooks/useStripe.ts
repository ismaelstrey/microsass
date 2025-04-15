import { useEffect, useState } from "react";
import  {loadStripe, Stripe} from "@stripe/stripe-js"
export function useStripe() {
    const [stripe, setStripe] = useState<Stripe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
async function loadStripeAsync() {
    const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!)
    setStripe(stripeInstance)
    setLoading(false)
}
loadStripeAsync();          
    },[])
    async function createPaymentStripeCheckout(checkoutData: any) {
        if(!stripe) {
            throw new Error("Stripe not initialized")
        }
        try {
            const paymentIntent = await fetch("/api/stripe/create-pay-checkout",{
                method: "POST",
                body: JSON.stringify(checkoutData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await paymentIntent.json();    
           await stripe.redirectToCheckout({
                sessionId: data.sessionId
            })
        } catch (error) {
            console.log(error)
            setError("Houve um erro ao criar o pagamento")
        }
    }

    async function createSubscriptionStripeCheckout(checkoutData: any) {
        if(!stripe) return; 
        try {
            const paymentIntent = await fetch("/api/stripe/create-subcription-checkout",{
                method: "POST",
                body: JSON.stringify(checkoutData),
                headers: {
                    "Content-Type": "application/json"
                }
            }             
        ) 
        const data = await paymentIntent.json();
       
        await stripe.redirectToCheckout({
            sessionId: data.sessionId
        })
        }
        catch (error) {
            console.log(error)
            setError("Houve um erro ao criar o pagamento") 
        }
    }

async function createStripePortalLink(customerId?: string) {
    if(!stripe) {
        throw new Error("Stripe not initialized")
    }
    try {
        const portalLink = await fetch("/api/stripe/create-portal",{
            method: "POST",
            body: JSON.stringify({customerId}),
            headers: {
                "Content-Type": "application/json"
            }
        }) 
        const data = await portalLink.json();
        console.log(data)
        window.location.href = data.url
    }
    catch (error) {
        console.log(error)
        setError("Houve um erro ao criar o pagamento") 
    }
}

    return {createPaymentStripeCheckout, createSubscriptionStripeCheckout,createStripePortalLink, loading, error}


}