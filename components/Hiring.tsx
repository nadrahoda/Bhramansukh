import React from 'react'
import Image from 'next/image'
import hire from '../public/assets/hire.jpg'
const Hiring = () => {
  return (
    <div className='bg-gray-900 w-full flex flex-col md:flex-row py-12 relative items-center'>

<div className="absolute inset-0 md:hidden">
        <Image
          src={hire}
          alt="Hiring"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
      </div>

     <div className='md:flex w-1/2 justify-center items-center hidden'>
     <Image src={hire} width={400} height={400} alt='Hiring' className='rounded-xl'/>
     </div>


     <div className='w-full md:w-1/2 px-6 md:px-12 relative z-10 text-center md:text-left '>
     <h1 className='text-white font-bold text-3xl'>We're Hiring!</h1>
     <p className='text-base font-medium text-gray-300 mt-2'>We're always looking for passionate individuals who love travel as much as we do.</p>
     <button
  className="bg-blue-500 text-white px-6 rounded-md text-sm font-semibold py-2 mt-6"
  onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=sales@bhramansukh.in&su=Job Application&body=Dear Hiring Manager,", "_blank")}
>
  Drop your CV at <span className="text-sm italic">sales@bhramansukh.in</span>
</button>


     </div>
    </div>
  )
}

export default Hiring
