'use server'
import SignIn from "@/components/auth/sign-in";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function Dashboard() {
  const session = await auth();
  if (!session) {
 redirect("/login")
  }
  console.log(session)
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">  Protected   DashBoard</h1>
        {/* <p>Email: {session.user?.email}</p> */}
        <SignIn autenticado/>
      
    </div>
  );

}