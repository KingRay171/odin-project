"use client";

import Image from 'next/image'
import Link from 'next/link';
import { useEffect } from 'react'

export default function Page() {

  return (
    <div className='h-screen flex flex-col'>
    <header className='flex justify-between mx-8 py-4'>
      <div>Leaderboard</div>
      <div>Character Hunt</div>
      <div>About</div>
    </header>
    <div className='w-3/5 h-4/5 bg-cover bg-background place-self-center flex flex-col justify-center items-center'>
      <h1 className='w-fit text-3xl'>Find all the hidden characters!</h1>
      <Link href={"/game"} className='w-fit'>Play</Link>
    </div>
    </div>
  )
}
