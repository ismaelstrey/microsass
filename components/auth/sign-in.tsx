import { handleAuth } from "@/actions/handle-auth" 
export default function SignIn({autenticado}:{autenticado?:boolean}) {
  return (
    <form
      action={handleAuth}
    >
      <button className="border p-2 cursor-pointer rounded-lg m-4" type="submit">{`${autenticado ? "Sair":"Signin with Google"} `}</button>
    </form>
  )
} 