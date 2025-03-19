'use client'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import React, { useState } from 'react'

const AboutUs = dynamic(() => import('@/components/AboutUs'))
const Team = dynamic(() => import('@/components/Team'))
const Hiring = dynamic(() => import('@/components/Hiring'))
const OurPartners = dynamic(() => import('@/components/OurPartners'))

const page = () => {
  const [selectedOption, setSelectedOption] = useState<string>('Strangers Unite')
  const [selectedPackage, setSelectedPackage] = useState<string>('')
  const [search, setSearch] = useState<boolean>(false)
  return (
    <>
      <Navbar
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
        setSearch={setSearch}
      />
      <AboutUs />
      <Team />
      <Hiring />
      <OurPartners />
      <Footer />
    </>
  )
}

export default page
