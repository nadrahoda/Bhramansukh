'use client'
import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { RiDoubleQuotesL } from 'react-icons/ri'
import Image, { StaticImageData } from 'next/image'
import review1 from '../public/assets/farah.jpg'
import review2 from '../public/assets/raza.png'
import review3 from '../public/assets/kamran.png' 
import review4 from '../public/assets/sam.png'
import review5 from '../public/assets/anisha.png'
import review6 from '../public/assets/shomail.jpg'
import review7 from '../public/assets/farheen.png'

interface TestimonialData {
  id: number
  name: string
  image: string | StaticImageData
  content: string
}

const testimonialsData: TestimonialData[] = [
    {
    id: 1,
    name: 'Anisha Singh',
    image: review5,
    content:
      'Thank you so much, Bhramansukh, for organizing an amazing, memorable, adventurous, and truly enjoyable trip. This experience will forever be one of my best, filled with unforgettable memories. We all started as strangers, but returned as friends, like family—brothers, sisters, and best friends. I hope for many more trips like this in the future.'
  },

  {
    id: 2,
    name: 'Raza Karim',
    image: review2,
    content:
      'I recently had an amazing trip with Bhramansukh Tour & Travels. From seamless planning to strategically located accommodations and a well-curated itinerary, every detail was perfection. The exceptional customer service, knowledgeable guides, and impeccable transportation made it a stress-free and enjoyable journey. Highly recommend Bhramansukh for a hassle-free and unforgettable travel experience!'
  },
  {
    id: 3,
    name: 'Kamran Akhtar',
    image: review3,
    content:
      'Fantastic customer service from Bhramansukh Tour & Travels .They made everything easy with prompt efficient follow up to our requests, all bookings completed smoothly - from Flights to accommodation and travel/ transfers etc. All went smoothly and without a hitch, meaning we could relax and enjoy our holiday! I will highly recommend you book through Bhramansukh.'
  },
  {
    id: 4,
    name: 'Sam Haq',
    image: review4,
    content:
      'Exceptional service! From booking to the actual tour, every aspect was seamless. The team at Bhramansukh Tour & Travels ensured our trip was unforgettable. Knowledgeable guides, comfortable accommodations, and well-planned itineraries made our experience truly memorable. Highly recommend them for your next adventure!'
  },
  {
    id: 5,
    name: 'Farah Rizwan',
    image: review1,
    content:
      'We had an amazing and safe experience in Uttarakhand with Bhramansukh Tours & Travels! The 3D/2N stay (Jan 25-28, 2024) was perfectly organized. The owner was extremely kind and knowledgeable, providing customized itineraries for all types of groups-family, friends, or couples. Highly recommended for a seamless travel experience! 😊'
  },
  {
    id: 6,
    name: 'Shomail Akhter',
    image: review6,
    content:
      'I booked a package through Bhramansukh and it turned out to be a great success. From the airport pick up till the airport drop off and everything at the destination was very smooth and well managed. I would really like to appreciate and thank Bhramansukh for their support and coordination throughout the trip. They were very professional and were constantly in touch with us making sure our trip goes smoothly.'
  },
  {
    id: 7,
    name: 'Farheen Hassan',
    image: review7,
    content:
      'I had so many trips from Bhramansukh and each trip was amazing.They personally make sure all the arrangements are perfect. I highly recommend Bhramansukh for your next trip.'
  }
]

const Testimonial: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(4)

  const updateVisibleCards = () => {
    const width = window.innerWidth
    if(width<640) setVisibleCards(1)
      else if(width<1024) setVisibleCards(3)
    else setVisibleCards(4)
  }

  useEffect(()=> {
    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)
    return () => window.removeEventListener('resize', updateVisibleCards)
  }, [])

  const maxIndex = testimonialsData.length - visibleCards


  // const testimonialsToShow = 4 
  // const maxIndex = testimonialsData.length - testimonialsToShow

  const goToNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1) // Move 1 testimonial at a time
    }
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1) // Move 1 testimonial at a time
    }
  }
  const translatePercent = (100 / testimonialsData.length) * currentIndex

  return (
    <div className='bg-gray-900 py-10 px-4'>
      <div className='text-center'>
        <h3 className='text-gray-400 text-lg uppercase tracking-widest'>
          REVIEWS
        </h3>
        <h1 className='text-white text-xl md:text-4xl font-semibold tracking-wide text-center'>
          What Our Clients Say About Us
        </h1>
      </div>

      {/* Testimonials Section */}
      <div className='relative w-full md:mt-14 mt-10 pt-14 overflow-hidden'>
        <div className='relative w-full h-full'>

        <div
          className={`flex transition-transform duration-500  ${visibleCards === 1 ? 'justify-center' : 'justify-start'}`}
          style={{
            transform: `translateX(-${translatePercent}%)`, // Shift by 1 testimonial at a time
            width: `${(100 / visibleCards) * testimonialsData.length}%`,
             gap: visibleCards === 1 ? '0px' : '0.5rem',
           
          }}
        >
          {testimonialsData.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className=' bg-white rounded-xl pt-16 p-5 shadow-lg flex-shrink-0 relative'
               style={{ width: `${100 / testimonialsData.length}%`,
              maxWidth: visibleCards === 1 ? '90%' : 'unset',
        margin: visibleCards === 1 ? '0 auto' : '0',
              }}
            >
              <div className='absolute left-1/2 -top-12 transform -translate-x-1/2 z-10'>
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  className='rounded-full object-cover border-2  border-white shadow-md'
                  width={96}
                  height={96}
                />
              </div>
              <RiDoubleQuotesL size={30} color='red' className='mb-2 mt-2' />
              <p className='text-gray-800 mb-3  lg:text-sm text-xs'>
                {testimonial.content}
              </p>
              <h3 className='text-red-500 text-base font-bold italic absolute bottom-3 right-0 transform -translate-x-1/2 text-center'>
                {' '}
                - {testimonial.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Navigation Buttons */}
      <div className='flex justify-center items-center mt-8 space-x-3'>
        <button
          className={`text-white p-3 rounded-full bg-gray-700 ${
            currentIndex === 0
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-600'
          }`}
          onClick={goToPrev}
          disabled={currentIndex === 0}
        >
          <IoIosArrowBack size={20} />
        </button>
        <button
          className={`text-white p-3 rounded-full bg-gray-700 ${
            currentIndex === maxIndex
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-600'
          }`}
          onClick={goToNext}
          disabled={currentIndex === maxIndex}
        >
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </div>
  )
}

export default Testimonial
