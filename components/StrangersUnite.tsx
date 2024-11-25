// components/StrangersUnite.tsx
import React, { useState, useEffect, useRef } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import Image from 'next/image'
const StrangersUnite = () => {
  const [currentImage, setCurrentImage] = useState<number>(1)
  const [currentEscape, setCurrentEscape] = useState<number>(0)

  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const text = 'From Strangers to Squad - Your Next Adventure Starts Here!'
  const letters = text.split('')

  const escapes = [
    {
      image: '/assets/goaunite.jpg',
      description: (
        <>
          <h1 className='text-lg font-semibold'>Goa Vibes</h1>
          <p>Sunsets, beaches, and endless parties.</p>
        </>
      )
    },
    {
      image: '/assets/himalayasunite.jpg',
      description: (
        <>
          <h1 className='text-lg font-semibold'>Himalayan Bliss</h1>
          <p>Trekking, bonfires, and starry nights.</p>
        </>
      )
    },
    {
      image: '/assets/rajasthanunite.jpg',
      description: (
        <>
          <h1 className='text-lg font-semibold'>Royal Rajasthan</h1>
          <p>Camel rides, palaces, and Insta-perfect moments.</p>
        </>
      )
    }
  ]

  // Intersection Observer to detect section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  useEffect(() => {
    const escapeInterval = setInterval(() => {
      setCurrentEscape(prevEscape => (prevEscape + 1) % escapes.length)
    }, 5000)

    return () => clearInterval(escapeInterval) // Cleanup the interval on unmount
  }, [])

  return (
    <div className='flex md:flex-row flex-col  md:space-x-8 bg-gray-800 py-10 px-6 md:px-28'>
      {/* Left Section */}
      <div className='w-full md:w-3/5 flex  justify-center flex-col'>
        <h2 className='text-3xl text-white font-bold'>Strangers Unite Trip</h2>
        <div ref={sectionRef} className='overflow-hidden mt-4 hidden md:block'>
          <p className='animated-text space-x-1 text-blue-500 font-semibold'>
            {letters.map((letter, index) => (
              <span
                key={index}
                className={`animated-letter ${isInView ? 'animate' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </p>
        </div>
        <p className='text-base italic mt-2 text-blue-400 md:hidden'>{text}</p>

        <h3 className='text-lg font-semibold mt-8 text-white'>
          Why Choose a Strangers Unite Trip?
        </h3>
        <ul className='list-disc list-inside mt-4 text-white flex flex-col space-y-4 '>
          <li className='flex text-sm w-full md:w-[60%]'>
            <FaCheckCircle className='text-blue-500 mr-4 mt-1 flex-none h-auto' />{' '}
            {/* Icon spans both lines */}
            <div className='flex flex-col'>
              <strong>Travel Goals Unlocked:</strong>
              <span>
                Explore bucket-list destinations with a crew you just met.
              </span>
            </div>
          </li>
          <li className='flex text-sm md:w-[60%]'>
            <FaCheckCircle className='text-blue-500 mr-4 mt-1 flex-none h-auto' />
            <div className='flex flex-col'>
              <strong>No Drama, Just Karma:</strong>
              <span>We handle the details - just show up and vibe!</span>
            </div>
          </li>
          <li className='flex text-sm md:w-[60%]'>
            <FaCheckCircle className='text-blue-500 mr-4 mt-1 flex-none h-auto' />
            <div className='flex flex-col'>
              <strong>Squad Goals Redefined:</strong>
              <span>Epic moments from bonfire karaoke to beach games.</span>
            </div>
          </li>
          <li className='flex text-sm md:w-[60%]'>
            <FaCheckCircle className='text-blue-500 mr-4 mt-1 flex-none h-auto' />
            <div className='flex flex-col'>
              <strong>Big Experiences, Small Budgets:</strong>
              <span>Luxury travel without the luxury price tag.</span>
            </div>
          </li>
          <li className='flex text-sm md:w-[60%]'>
            <FaCheckCircle className='text-blue-500 mr-4 mt-1 flex-none h-auto' />
            <div className='flex flex-col'>
              <strong>Trending Destinations:</strong>
              <span>Discover hidden gems and the coolest spots first!</span>
            </div>
          </li>
        </ul>

        <p className='mt-8 font-semibold text-white'>
          Don't Just Travel - Trend! Book now and make unforgettable memories
          with your ultimate squad.
        </p>
        <p className='italic mt-4 text-gray-500'>
          "Because the best stories start with 'Remember that time on the
          trip…'"
        </p>
      </div>

      {/* Right Section */}
      <div className=' md:w-2/5 w-full flex flex-col items-center justify-center'>
        <div
          className='bg-gray-700 shadow-xl  mt-8 p-4 rounded-xl'
          style={{ width: '100%', maxWidth: '500px', minHeight: '400px' }} // Set consistent width and height
        >
          <h3 className='text-2xl font-semibold text-white text-center'>
            Upcoming Trending Escapes
          </h3>
          <Image
            src={escapes[currentEscape].image}
            alt='Trending Escape'
            className='w-full h-72 rounded-lg object-cover mt-4'
            width={400}
            height={400}
          />
          <div
            className=' mt-4 text-white text-center italic'
            style={{ minHeight: '50px' }} // Ensure consistent space for text
          >
            {escapes[currentEscape].description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StrangersUnite
