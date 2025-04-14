'use client'

import { useState } from "react"
import { FaArrowCircleDown } from "react-icons/fa"

export default function UsuarioDetalhes({ name, email, emailVerified}:{name?:string,email?:string,emailVerified?:boolean}) {
    const[ show, setShow ] = useState(false)
    const handleClick = () => {
        setShow(!show)
    }
  return (
    <div> 
        <FaArrowCircleDown onClick={handleClick} size={16}/>       
{ show &&        

<div>
       <h1 className="text-4xl font-bold">{name}</h1>
          <p>{email}</p>      
          {emailVerified ? <p>Email verificado: {emailVerified}</p> : <p>Email não verificado</p>}
       </div>
       }

 </div>  
  )

}