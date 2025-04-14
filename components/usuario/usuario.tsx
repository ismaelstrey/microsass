import Image from "next/image";
import SignIn from "@/components/auth/sign-in";
import { auth } from "@/lib/auth";
import UsuarioDetalhes from "./_detalhes";

 export interface UserProps {
    id?:string | undefined | null
    name?:string | undefined | null
    email?:string | undefined | undefined
    image?:string | null | undefined
    emailVerified?:boolean | null | undefined
}
export default async function Usuario() {
  const session = await auth();

const {email,id,image,name,emailVerified } = session?.user as UserProps || {}

  return (
    <div className="fixed top-2 right-4 flex items-center justify-center">
       {image &&  <Image className="rounded-full size-16" unoptimized src={image} width={100} height={100} alt=""/>}
     { name && email && <UsuarioDetalhes name={name} email={email} emailVerified={emailVerified || false}/>}
       <SignIn autenticado/>
    </div>
  );
}
