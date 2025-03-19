import React from 'react'
import Image from 'next/image'
import hire from '../public/assets/hire.jpg'
const Hiring = () => {
  return (
    <div className='bg-gray-900 w-full flex py-12 justify-center items-center'>
     <div className='flex w-1/2 justify-center items-center md:flex hidden'>
     <Image src={hire} width={400} height={400} alt='Hiring' className='rounded-xl'/>
     </div>
     <div className='w-1/2 '>
     <h1 className='text-white font-bold text-3xl'>We're Hiring!</h1>
     <p className='text-base font-medium text-gray-500 mt-2'>We're always looking for passionate individuals who love travel as much as we do.</p>
     <button className='bg-blue-500 text-white px-6 rounded-md text-lg font-semibold  py-2 mt-6'>Apply Now</button>
     </div>
    </div>
  )
}

export default Hiring
