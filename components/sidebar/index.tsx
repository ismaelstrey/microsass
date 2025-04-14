'use client'
import {  useState } from "react";
import Menu from "./menu";
import { TbArrowBadgeRightFilled } from "react-icons/tb";

export default function Sidebar() { 
    const [show, setShow] = useState(true);
    const handleClick = () => {
        setShow(!show);//verifica se está funcionand
    }
  return (
    <div className="flex h-screen "> 
        <TbArrowBadgeRightFilled title={ show ? 'Esconder menu' :'Mostrar menu'} size={40} className={`fixed top-2 left-2 ${show && 'rotate-180'}`} onClick={handleClick}/>       
        {show &&
         <Menu/> }
    </div>
  
  );
}