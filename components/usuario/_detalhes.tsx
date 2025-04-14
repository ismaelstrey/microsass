'use client'
export default function UsuarioDetalhes({ name, email, emailVerified}:{name?:string,email?:string,emailVerified?:boolean}) {
  return (
    <div>        
          <h1 className="text-4xl font-bold">{name}</h1>
          <p>{email}</p>      
          {emailVerified ? <p>Email verificado: {emailVerified}</p> : <p>Email não verificado</p>}
        </div>  
  )

}