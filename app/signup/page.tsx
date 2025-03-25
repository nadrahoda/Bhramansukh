"use client"

import React, {useState} from 'react'
import Signup from '@/components/Signup';
import { Suspense } from 'react'
import Navbar from '@/components/Navbar';
const SignupPage: React.FC = () => {
  const [search, setSearch] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] =
    useState<string>('Strangers Unite')
    const [selectedPackage, setSelectedPackage] =
    useState<string>('')
  return (
    <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
      <div className='h-screen overflow-hidden'>
      <Navbar selectedOption={selectedOption} setSelectedOption={setSelectedOption} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} setSearch={setSearch}/>
      <Signup />
      </div>
    </Suspense>
  )
}

export default SignupPage
