import React from 'react'
import Image from 'next/image'
import teamMember1 from '../public/assets/shabab.jpg'
import teamMember2 from '../public/assets/nadra.jpg'
import teamMember3 from '../public/assets/Goa.jpg'
import teamMember4 from '../public/assets/Himachal.jpg'
import teamMember5 from '../public/assets/Karnataka.jpg'
const Team = () => {
  return (
    <div className='bg-gray-800 py-16'>
      {/* Heading */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-white border-b-4 border-blue-500 inline-block pb-2'>
        Meet Our Leadership
        </h1>
        <p className="text-gray-400 mt-4 text-lg italic">
          The driving force behind our vision and success.
        </p>
      </div>

      {/* Team Members */}
      <div className='flex flex-col md:flex-row justify-center items-center gap-12'>
        {/* Team Member 1 */}
        <div className='flex flex-col items-center bg-gray-800 p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105'>
          <div className='h-52 w-52 rounded-full overflow-hidden border-4 border-blue-500'>
            <Image
              src={teamMember1}
              alt='M Shabab'
              
              objectFit='cover'
              width={208}
              height={208}
            />
          </div>
          <h2 className='text-xl font-semibold text-white mt-4'>
          M Shabab
          </h2>
          <p className='text-blue-400 text-lg font-medium'>Founder & Lead Strategist</p>
          <p className="text-gray-400 text-center mt-2">
            Passionate about shaping the future of travel experiences.
          </p>
        </div>

        {/* Team Member 2 */}
        <div className='flex flex-col items-center bg-gray-800 p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105'>
          <div className='h-52 w-52 rounded-full overflow-hidden border-4 border-blue-500'>
            <Image
              src={teamMember2}
              alt='Nadra Hoda'
              objectFit='cover'
              width={208}
              height={208}
            />
          </div>
          <h2 className='text-xl font-semibold text-white mt-4'>Nadra Hoda</h2>
          <p className="text-blue-400 text-lg font-medium">Technical Lead</p>
          <p className="text-gray-400 text-center mt-2">
            Leading innovation and technology to enhance our platform.
          </p>
        </div>

        {/* Team Member 3 */}
        {/* <div className='flex flex-col items-center'>
          <div className='h-48 w-48 rounded-full overflow-hidden border-4 border-blue-500'>
            <Image
              src={teamMember3}
              alt='Team Member 3'
              className='rounded-full'
              objectFit='cover'
              width={192}
              height={192}
            />
          </div>
          <h2 className='text-xl font-semibold text-white mt-4'>Emily Brown</h2>
          <p className='text-gray-400'>UI/UX Designer</p>
        </div> */}

        {/* Team Member 4 */}
        {/* <div className='flex flex-col items-center'>
          <div className='h-48 w-48 rounded-full overflow-hidden border-4 border-blue-500'>
            <Image
              src={teamMember4}
              alt='Team Member 4'
              className='rounded-full'
              objectFit='cover'
              width={192}
              height={192}
            />
          </div>
          <h2 className='text-xl font-semibold text-white mt-4'>
            Chris Johnson
          </h2>
          <p className='text-gray-400'>Marketing Head</p>
        </div> */}

        {/* Team Member 5 */}
        {/* <div className='flex flex-col items-center'>
          <div className='h-48 w-48 rounded-full overflow-hidden border-4 border-blue-500'>
            <Image
              src={teamMember5}
              alt='Team Member 5'
              className='rounded-full'
              objectFit='cover'
              width={192}
              height={192}
            />
          </div>
          <h2 className='text-xl font-semibold text-white mt-4'>
            Sophia White
          </h2>
          <p className='text-gray-400'>Project Manager</p>
        </div> */}
      </div>
    </div>
  )
}

export default Team
