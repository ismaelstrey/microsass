import SignIn from "@/components/auth/sign-in";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">  Login</h1>
        <SignIn/>
    </div>
  );
}
