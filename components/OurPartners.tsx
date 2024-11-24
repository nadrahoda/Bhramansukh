import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
const OurPartners = () => {
    const partners = [
        {
          title: "Hotels & Resorts",
          description: "World-class properties ensuring comfort, luxury, and seamless stays.",
        },
        {
          title: "Activity Providers",
          description: "Adventure specialists, cultural curators, and entertainment experts for diverse experiences.",
        },
        {
          title: "Food & Beverage Partners",
          description: "Cafes, restaurants, and local food artisans who make every bite memorable.",
        },
        {
          title: "Transport Partners",
          description: "Reliable travel companions for smooth and safe journeys.",
        },
      ];
  return (
    <section className="bg-gray-800 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-2 text-white">Our Esteemed Partners</h2>
        <p className="text-center text-lg mb-10 text-blue-300 italic ">
        Together, We Create Extraordinary Journeys.
        </p>
      <div className='w-full flex py-10 h-[300px] gap-8'>
<div className='w-1/4 flex justify-center items-center border-r mr-4 '>
<h1 className='text-5xl font-bold text-white w-[60%] '>Why Partner with us?</h1>
</div>
<div className='w-1/4 rounded-2xl shadow-2xl bg-gray-900 text-white flex items-center justify-center '>
<div className='flex items-center justify-center flex-col p-5'>
    <h3 className='text-lg font-semibold text-blue-500 mb-3 italic'>Collaboration for Impact</h3>
    <p className='text-center text-sm font-normal text-pretty '>We believe in building strong alliances to deliver unforgettable travel experiences. From hotels to activity providers, our partners are the backbone of our journeys.</p>
</div>
</div>
<div className=' w-1/4 rounded-2xl shadow-2xl bg-gray-900 text-white flex items-center justify-center'>
<div className='flex items-center justify-center flex-col p-5'>
<h3 className='text-lg font-semibold text-blue-500 mb-3 italic'>Shared Vision, Mutual Growth</h3>
<p className='text-center text-sm font-normal text-pretty '>Our partnerships are built on trust, transparency, and a shared commitment to delivering quality services and unique experiences.</p>
</div>

</div>
<div className=' w-1/4 rounded-2xl shadow-2xl bg-gray-900 text-white flex items-center justify-center'>
<div className='flex items-center justify-center flex-col p-5'>
<h3 className='text-bsse font-semibold text-blue-500 mb-3 italic text-center'>Expanding Reach, Elevating Experiences</h3>
<p className='text-center text-sm font-normal text-pretty '>By collaborating with us, you gain access to a vibrant community of enthusiastic travelers while contributing to unforgettable moments.</p>
</div>

</div>

      </div>
        <div className="flex items-center justify-center">
          <button
           
            className="flex items-center bg-blue-600 text-white px-12 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Join Us Now <FaArrowRight className='ml-2 mt-1'/>
          </button>
        </div>
      </div>
    </section>
  )
}

export default OurPartners
