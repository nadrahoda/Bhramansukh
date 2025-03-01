"use client"

import React from 'react'
import Signup from '@/components/Signup';
import { Suspense } from 'react'

const SignupPage: React.FC = () => {

  return (
    <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
      <Signup />
    </Suspense>
  )
}

export default SignupPage
