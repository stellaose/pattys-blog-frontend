import React from 'react'
import Image from "next/image";
import Logo from "#assets/images/logo.png";

export const Footer = () => {
  return (
    <div className='bg-orange-disabled p-8'>
       <Image src={Logo} alt="" className="h-12.5 w-auto" loading="eager" />
      
      <div></div>
      <div></div>
    </div>
  )
}
