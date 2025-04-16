import Usuario from "@/components/usuario/usuario";
import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";
export default async function Dashboard() {
  const session = await auth();
  if (!session) {
 redirect("/login")
  }
  console.log(session)
  return (
    <div suppressHydrationWarning className="flex w-full flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">  Pagamento realizado com sucesso</h1>     
      <Usuario />   
    </div>
  );

}