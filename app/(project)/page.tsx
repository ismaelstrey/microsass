import Link from "next/link";

export default function Home() {
  return (
 

   <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">  Protected   DashBoard</h1>
        <Link href="/login">Login</Link>s
    </div>

  );
}
