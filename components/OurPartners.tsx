import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
const OurPartners = () => {
  const partners = [
    {
      title: 'Hotels & Resorts',
      description:
        'World-class properties ensuring comfort, luxury, and seamless stays.'
    },
    {
      title: 'Activity Providers',
      description:
        'Adventure specialists, cultural curators, and entertainment experts for diverse experiences.'
    },
    {
      title: 'Food & Beverage Partners',
      description:
        'Cafes, restaurants, and local food artisans who make every bite memorable.'
    },
    {
      title: 'Transport Partners',
      description: 'Reliable travel companions for smooth and safe journeys.'
    }
  ]
  return (
    <section className='bg-gray-800 py-12'>
      <div className='container mx-auto px-6'>
        <h2 className='md:text-4xl text-2xl font-bold text-center mb-2 text-white'>
          Our Esteemed Partners
        </h2>
        <p className='text-center md:text-lg text-sm mb-10 text-blue-300 italic '>
          Together, We Create Extraordinary Journeys.
        </p>

        {/* Responsive Wrapper */}
        <div className='w-full flex flex-wrap lg:flex-nowrap md:py-10 py-2  gap-8'>
          <div className='w-full lg:w-1/4 flex justify-center items-center  mr-4 lg:border-r px-4'>
            <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center lg:text-left '>
              Why Partner with us?
            </h1>
          </div>

          {/* Partner Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:w-3/4 '>
            {/* Card 1 */}
            <div className='rounded-2xl shadow-2xl bg-gray-900 text-white flex items-center justify-center p-5'>
              <div className='text-center'>
                <h3 className='text-lg font-semibold text-blue-500 mb-3 italic'>
                  Collaboration for Impact
                </h3>
                <p className='text-sm font-normal text-pretty '>
                  We believe in building strong alliances to deliver
                  unforgettable travel experiences. From hotels to activity
                  providers, our partners are the backbone of our journeys.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className='rounded-2xl shadow-2xl bg-gray-900 text-white flex items-center justify-center p-5'>
              <div className='text-center'>
                <h3 className='text-lg font-semibold text-blue-500 mb-3 italic'>
                  Shared Vision, Mutual Growth
                </h3>
                <p className=' text-sm font-normal text-pretty '>
                  Our partnerships are built on trust, transparency, and a
                  shared commitment to delivering quality services and unique
                  experiences.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className='rounded-2xl shadow-2xl bg-gray-900 text-white flex items-center justify-center py-5 px-2 sm:col-span-2 lg:col-span-1 mx-auto'>
              <div className='text-center'>
                <h3 className='text-lg font-semibold text-blue-500 mb-3 italic '>
                  Expanding Reach, Elevating Experiences
                </h3>
                <p className=' text-sm font-normal text-pretty '>
                  By collaborating with us, you gain access to a vibrant
                  community of enthusiastic travelers while contributing to
                  unforgettable moments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className='flex items-center justify-center mt-8'>
          <button className='flex items-center bg-blue-600 text-white px-12 py-3 rounded-lg hover:bg-blue-700 transition-colors' onClick={() =>
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=sales@bhramansukh.in&su=Partnership Inquiry&body=Dear Team,",
      "_blank"
    )
  }>
            Join Us Now <FaArrowRight className='ml-2 mt-1' />
          </button>
        </div>
      </div>
    </section>
  )
}

export default OurPartners
