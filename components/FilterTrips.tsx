// components/FilterTrips.tsx
"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { FaArrowRightLong, FaClock } from 'react-icons/fa6'
import { IoLocationSharp } from 'react-icons/io5'
import Image, { StaticImageData } from 'next/image'

import cardImage1 from '../public/assets/image1.jpg'
import cardImage6 from '../public/assets/image6.jpg'
import cardImage7 from '../public/assets/image7.jpg'
import cardImage9 from '../public/assets/image9.jpg'
import cardImage10 from '../public/assets/image10.jpg'
import cardImage11 from '../public/assets/image11.jpg'
import cardImage12 from '../public/assets/image12.jpg'
import cardImage13 from '../public/assets/image13.jpg'
import salebanner from '../public/assets/sale.jpg'

// Define types for card data and option
type CardData = {
  id: number
  category: string
  title?: string
  location?: string
  duration?: string
  price?: string
  image: StaticImageData
}

const FilterTrips: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('Sale of The Season')

  const cardsData: CardData[] = [
    {
      id: 1,
      category: 'Sale of The Season',
      title: 'Vizag and Araku Valley Tour',
      location: 'Visakhapatnam',
      duration: '4D/3N',
      price: '₹ 10,000',
      image: cardImage10
    },
    {
      id: 2,
      category: 'Sale of The Season',
      title: 'Quick Escape to Tawang',
      location: 'Assam',
      duration: '4D/3N',
      price: '₹ 15,000',
      image: cardImage11
    },
    { id: 3, category: 'Sale of The Season', image: salebanner },
    {
      id: 4,
      category: 'Sale of The Season',
      title: 'Assam Cultural Experience',
      location: 'Guwahati',
      duration: '4D/3N',
      price: '₹ 15,000',
      image: cardImage12
    },
    {
      id: 5,
      category: 'Sale of The Season',
      title: 'Bodh Gaya Spiritual Retreat',
      location: 'Gaya',
      duration: '3D/2N',
      price: '₹ 8,000',
      image: cardImage13
    },
    {
      id: 6,
      category: 'X-mas & New Year Trips',
      title: 'Card 6',
      image: cardImage6
    },
    {
      id: 7,
      category: 'X-mas & New Year Trips',
      title: 'Card 7',
      image: cardImage7
    },
    {
      id: 8,
      category: 'X-mas & New Year Trips',
      title: 'Card 8',
      image: salebanner
    },
    {
      id: 9,
      category: 'X-mas & New Year Trips',
      title: 'Card 9',
      image: cardImage9
    },
    {
      id: 10,
      category: 'X-mas & New Year Trips',
      title: 'Card 10',
      image: cardImage1
    }
  ]

  const options = [
    'Strangers Unite',
    'Therapy Travels',
    'Exposure Camps',
    'Seasonal Packages',
    'Adventure',
    'Family',
    'Nature',
    'Honeymoon',
    'Wildlife',
    'Friends',
    'Water Activities',
    'Religious',
  ]

  // Filter cards based on selected option
  const filteredCards = cardsData.filter(card => card.category === selectedOption).slice(0, 5)

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
  }

  return (
    <div className='flex bg-gray-900 py-20'>
      {/* Left section (1/4) */}
      <div className='w-1/4 p-8 border-r bg-white rounded-2xl'>
        <h2 className='text-2xl font-semibold mb-4 text-left'>Select from our tours</h2>
        <div>
          {options.map(option => (
            <label key={option} className='flex items-center mb-5 cursor-pointer text-sm'>
              <input
                type='radio'
                name='filter'
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
                className='hidden'
              />
              <span
                className={`custom-checkbox w-5 h-5 mr-2 border rounded ${
                  selectedOption === option ? 'bg-blue-500' : 'bg-white'
                } cursor-pointer flex items-center justify-center`}
                onClick={() => handleOptionChange(option)}
              >
                {selectedOption === option && (
                  <svg
                    className='w-3 h-3 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                  </svg>
                )}
              </span>
              <span className={selectedOption === option ? 'text-black font-semibold' : 'text-gray-600'}>
                {option}
              </span>
              {selectedOption === option && (
                <Link href='/view-all' className='text-blue-500 ml-2 text-xs flex items-center'>
                  View All <FaArrowRightLong className='ml-1' size={12} />
                </Link>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Right section (3/4) */}
      <div className='w-3/4 px-4 text-white'>
        <div className='grid grid-cols-1 gap-4 h-full'>
          {filteredCards.length ? (
            <>
              {/* First row: two cards */}
              <div className='grid grid-cols-2 gap-4 col-span-2 md:col-span-3'>
                {filteredCards.slice(0, 2).map(card => (
                  <div
                    key={card.id}
                    className='h-56 p-4 shadow-xl rounded-xl relative'
                    style={{
                      backgroundImage: `url(${card.image.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className='absolute inset-0 bg-black bg-opacity-50 rounded-xl'></div>
                    <div className='absolute inset-0 flex flex-col text-white'>
                      <span className='absolute top-3 left-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full rounded-l-none'>
                        Best Seller
                      </span>
                      <span className='flex absolute top-3 right-3 text-white text-sm items-center'>
                        <FaClock className='mr-1' /> {card.duration}
                      </span>
                      <div className='mt-14 pl-6 flex flex-col items-start'>
                        <h3 className='text-xl font-semibold text-left'>{card.title}</h3>
                        <p className='px-2 py-1 text-left mt-6 rounded-full flex items-center border border-white inline-block text-xs'>
                          <IoLocationSharp size={16} className='mr-1' /> {card.location}
                        </p>
                      </div>

                      <div className='flex justify-between w-full px-6 mt-10'>
                        <span className='font-semibold text-lg flex items-center'>
                          <span className='text-base'> Starting Cost: </span>
                          <span className='italic flex items-center ml-2 font-bold text-xl'>{card.price}</span>
                        </span>
                        <button className='bg-blue-500 text-white text-xs px-3 py-1 rounded-full transition-transform duration-200 transform hover:scale-105 text-center font-bold'>
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Second row: one card spanning full width */}
              {filteredCards[2] && (
                <div
                  key={filteredCards[2].id}
                  className='h-48 p-4 rounded-xl shadow col-span-2 md:col-span-3'
                  style={{
                    backgroundImage: `url(${filteredCards[2].image.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
              )}

              {/* Third row: two more cards */}
              <div className='grid grid-cols-2 gap-4 col-span-2 md:col-span-3'>
                {filteredCards.slice(3, 5).map(card => (
                  <div
                    key={card.id}
                    className='h-56 p-4 shadow-xl rounded-xl relative'
                    style={{
                      backgroundImage: `url(${card.image.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className='absolute inset-0 bg-black bg-opacity-50 rounded-xl'></div>
                    <div className='absolute inset-0 flex flex-col text-white'>
                      <span className='absolute top-3 left-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full rounded-l-none'>
                        Best Seller
                      </span>
                      <span className='flex absolute top-3 right-3 text-white text-sm items-center'>
                        <FaClock className='mr-1' /> {card.duration}
                      </span>
                      <div className='mt-14 pl-6 flex flex-col items-start'>
                        <h3 className='text-xl font-semibold text-left'>{card.title}</h3>
                        <p className='px-2 py-1 text-left mt-6 rounded-full flex items-center border border-white inline-block text-xs'>
                          <IoLocationSharp size={16} className='mr-1' /> {card.location}
                        </p>
                      </div>

                      <div className='flex justify-between w-full px-6 mt-10'>
                        <span className='font-semibold text-lg flex items-center'>
                          <span className='text-base'> Starting Cost: </span>
                          <span className='italic flex items-center ml-2 font-bold text-xl'>{card.price}</span>
                        </span>
                        <button className='bg-blue-500 text-white text-xs px-3 py-1 rounded-full transition-transform duration-200 transform hover:scale-105 text-center font-bold'>
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className='text-center text-gray-300'>No cards found for the selected option.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterTrips
