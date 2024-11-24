import Navbar from '@/components/Navbar'
import React from 'react'

import AboutUs from '../../components/AboutUs'
import Team from '@/components/Team'
import Footer from '@/components/Footer'
import Hiring from '@/components/Hiring'
import OurPartners from '@/components/OurPartners'
const page = () => {
  return (
    <>
      <Navbar/>
      <AboutUs/>
      <Team/>
      <Hiring/>
      <OurPartners/>
      <Footer/>
    </>
  )
}

export default page
