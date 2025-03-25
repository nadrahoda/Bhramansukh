"use client"
import React, { useState } from 'react'
import LoginForm from '@/components/LoginForm'
import Navbar from '@/components/Navbar'
import { Suspense } from 'react'


const Login: React.FC= () => {
   const [search, setSearch] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] =
    useState<string>('Strangers Unite')
    const [selectedPackage, setSelectedPackage] =
    useState<string>('')
  
  return (
        <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
    <div className='h-screen overflow-hidden '>
    <Navbar selectedOption={selectedOption} setSelectedOption={setSelectedOption} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} setSearch={setSearch}/>
       <LoginForm/>
    </div>
    </Suspense>
 
  )
}

export default Login
