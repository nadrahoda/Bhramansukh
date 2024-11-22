import React from 'react'
import Image from 'next/image'
import teamMember1 from '../public/assets/shabab.jpg'
import teamMember2 from '../public/assets/nadra.png'
import teamMember3 from '../public/assets/Goa.jpg'
import teamMember4 from '../public/assets/Himachal.jpg'
import teamMember5 from '../public/assets/Karnataka.jpg'
const Team = () => {
  return (
    <div className='bg-gray-800 py-16'>
      {/* Heading */}
      <div className='flex items-center justify-center mb-12'>
        <h1 className='text-4xl font-bold text-white border-b-4 border-blue-500 pb-2'>
          Our Team
        </h1>
      </div>

      {/* Team Members */}
      <div className='flex justify-center flex-wrap gap-8'>
        {/* Team Member 1 */}
        <div className='flex flex-col items-center'>
          <div className='h-48 w-48 rounded-full overflow-hidden border-4 border-blue-500'>
            <Image
              src={teamMember1}
              alt='Team Member 1'
              className='rounded-full'
              objectFit='cover'
              width={192}
              height={192}
            />
          </div>
          <h2 className='text-xl font-semibold text-white mt-4'>
            Md Shabab Uddin
          </h2>
          <p className='text-gray-400'>CEO & Founder</p>
        </div>

        {/* Team Member 2 */}
        <div className='flex flex-col items-center'>
          <div className='h-48 w-48 rounded-full overflow-hidden border-4 border-blue-500'>
            <Image
              src={teamMember2}
              alt='Team Member 2'
              className='rounded-full'
              objectFit='cover'
              width={192}
              height={192}
            />
          </div>
          <h2 className='text-xl font-semibold text-white mt-4'>Nadra Hoda</h2>
          <p className='text-gray-400'>Lead Developer</p>
        </div>

        {/* Team Member 3 */}
        <div className='flex flex-col items-center'>
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
        </div>

        {/* Team Member 4 */}
        <div className='flex flex-col items-center'>
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
        </div>

        {/* Team Member 5 */}
        <div className='flex flex-col items-center'>
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
        </div>
      </div>
    </div>
  )
}

export default Team
