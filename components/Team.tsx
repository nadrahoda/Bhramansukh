import React from 'react'
import Image from 'next/image'
import teamMember1 from '../public/assets/shabab.jpg'
import teamMember2 from '../public/assets/nadra.jpg'

const Team = () => {
  return (
    <div className='bg-gray-800 md:py-16 py-8'>
      {/* Heading */}
      <div className='text-center md:mb-12 ,mb-6'>
        <h1 className='md:text-4xl text-2xl font-bold text-white border-b-4 border-blue-500 inline-block pb-2'>
        Meet Our Leadership
        </h1>
        <p className="text-gray-400 mt-4 md:text-lg text-xs italic">
          The driving force behind our vision and success.
        </p>
      </div>

      {/* Team Members */}
      <div className='flex flex-col md:flex-row justify-center items-center gap-12'>
        {/* Team Member 1 */}
        <div className='flex flex-col items-center bg-gray-800 p-6 md:m-0 m-4 rounded-2xl shadow-lg transition-transform transform hover:scale-105'>
          <div className='md:h-52 md:w-52 h-40 w-40 rounded-full overflow-hidden border-4 border-blue-500'>
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
          <p className="text-gray-400 text-center mt-2 ">
          With a passion for travel, M Shabab crafts unforgettable journeys.
          </p>
        </div>

        {/* Team Member 2 */}
        <div className='flex flex-col items-center bg-gray-800 p-6 md:m-0 m-4 rounded-2xl shadow-lg transition-transform transform hover:scale-105'>
          <div className='md:h-52 md:w-52 h-40 w-40 rounded-full overflow-hidden border-4 border-blue-500'>
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
          Responsible for technical operations and ensures seamless execution.
          </p>
        </div>

     
      </div>
    </div>
  )
}

export default Team
