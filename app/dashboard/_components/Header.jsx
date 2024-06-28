'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'


export default function Header() {
  const path = usePathname()

  return (
    <div className='w-screen bg-secondary flex justify-center '>
      <div className='w-10/12 flex items-center justify-between shadow-sm '>
      <Image src={'/logo.svg'} width={100} height={50} alt={'logo'} className='h-16'/>

      <ul className='hidden md:flex gap-6'>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path === '/dashboard' && 'text-primary font-bold'}
          `}>
          Dashboard</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path === '/dashboard/questions' && 'text-primary font-bold'}
          `}>
          Questions</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path === '/dashboard/upgrade' && 'text-primary font-bold'}
          `}>
          Upgrade</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
          ${path === '/dashboard/workflow' && 'text-primary font-bold'}
          `}>
          How it Works?</li>
      </ul>

      <UserButton />
      </div>
    </div>
  )
}
