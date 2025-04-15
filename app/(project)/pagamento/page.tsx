'use client'

import { useStripe } from "@/hooks/useStripe"

export default function PagePagamentos() {

    const {createPaymentStripeCheckout,createStripePortalLink,createSubscriptionStripeCheckout} = useStripe()


  return (

<div className="flex w-full gap-4 flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold">  Pagamentos</h1>
    <div className="flex gap-8 w-full justify-center">       
        <button onClick={()=>createPaymentStripeCheckout({
          testeId:"123"
        })} className="border rounded-lg p-2 cursor-pointer hover:scale-110">Criar pagamento stripe</button>
        <button onClick={()=>createSubscriptionStripeCheckout({
          testeId:"123"
        })} className="border rounded-lg p-2 cursor-pointer hover:scale-110">Criar Assinatura stripe</button>
        <button onClick={()=>createStripePortalLink()} className="border rounded-lg p-2 cursor-pointer hover:scale-110">Criar Portal stripe</button>
    </div>
</div>
  )
}