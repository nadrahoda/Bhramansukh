"use client"
import Navbar from '@/components/Navbar'
import React, {useState} from 'react'

import AboutUs from '../../components/AboutUs'
import Team from '@/components/Team'
import Footer from '@/components/Footer'
import Hiring from '@/components/Hiring'
import OurPartners from '@/components/OurPartners'

const page = () => {
  const [selectedOption, setSelectedOption] =
    useState<string>('Strangers Unite');
    const [selectedPackage, setSelectedPackage] =
  useState<string>('')
  return (
    <>
      <Navbar selectedOption={selectedOption} setSelectedOption={setSelectedOption} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage}/>
      <AboutUs/>
      <Team/>
      <Hiring/>
      <OurPartners/>
      <Footer/>
    </>
  )
}

export default page
