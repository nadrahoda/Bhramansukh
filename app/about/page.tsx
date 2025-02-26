import Navbar from '@/components/Navbar'
import React, {useState} from 'react'

import AboutUs from '../../components/AboutUs'
import Team from '@/components/Team'
import Footer from '@/components/Footer'
import Hiring from '@/components/Hiring'
import OurPartners from '@/components/OurPartners'

const page = () => {
  const [selectedOption, setSelectedOption] =
    useState<string>('Strangers Unite')
  return (
    <>
      <Navbar selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
      <AboutUs/>
      <Team/>
      <Hiring/>
      <OurPartners/>
      <Footer/>
    </>
  )
}

export default page
