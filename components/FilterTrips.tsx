// components/FilterTrips.tsx
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FaArrowRightLong, FaClock } from 'react-icons/fa6'
import { IoLocationSharp } from 'react-icons/io5'
import Image, { StaticImageData } from 'next/image'

import cardImage1 from '../public/assets/rishikesh.jpeg'
import cardImage6 from '../public/assets/manali.jpeg'
import cardImage7 from '../public/assets/goaunite.jpg'
import cardImage9 from '../public/assets/coorg.jpeg'
import cardImage10 from '../public/assets/kerala1.jpeg'
import cardImage11 from '../public/assets/dharamshala.jpeg'
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
  const [selectedOption, setSelectedOption] =
    useState<string>('Strangers Unite')

  const cardsData: CardData[] = [
    {
      id: 1,
      category: 'Strangers Unite',
      title: 'Rishikesh - Adventure and Spiritual Retreat',
      location: 'Rishikesh',
      duration: '3D/2N',
      price: '₹ 9,500',
      image: cardImage1
    },
    {
      id: 2,
      category: 'Strangers Unite',
      title: 'Manali - Snow Adventures and Scenic Views',
      location: 'Manali',
      duration: '4D/3N',
      price: '₹ 11,000',
      image: cardImage6
    },
    { id: 3, category: 'Strangers Unite', image: salebanner },
    {
      id: 4,
      category: 'Strangers Unite',
      title: 'Goa - Fun and Beach Activities',
      location: 'Goa',
      duration: '3D/2N',
      price: '₹ 7,500',
      image: cardImage7
    },
    {
      id: 5,
      category: 'Strangers Unite',
      title: 'Coorg - Coffee Plantations and Scenic Trails',
      location: 'Coorg',
      duration: '3D/2N',
      price: '₹ 7,300',
      image: cardImage9
    },
    {
      id: 6,
      category: 'Therapy Travels',
      title: 'Kerala - Ayurvedic Wellness and Backwater Escape',
      location: 'Kerala',
      duration: '4D/3N',
      price: '₹ 15,000',
      image: cardImage10
     
    },
    {
      id: 7,
      category: 'Therapy Travels',
      title: 'Coorg - Nature Healing and Wellness Retreat',
      location: 'Coorg',
      duration: '3D/2N',
      price: '₹ 9,000',
      image: cardImage9
    },
    {
      id: 8,
      category: 'Therapy Travels',
      image: salebanner
    },
    {
      id: 9,
      category: 'Therapy Travels',
      title: 'Rishikesh - Spiritual Healing and Yoga Retreat',
      location: 'Rishikesh',
      duration: '3D/2N',
      price: '₹ 10,500',
      image: cardImage1
    },
    {
      id: 10,
      category: 'Therapy Travels',
      title: 'Dharamshala - Himalayan Meditation and Healing Escape',
      location: 'Dharamshala',
      duration: '3D/2N',
      price: '₹ 11,500',
      image: cardImage11
    },
    {
      id: 11,
      category: 'Exposure Camps',
      title: 'Jodhpur - Adventure and Leadership Exposure Camp',
      location: 'Jodhpur',
      duration: '3D/2N',
      price: '₹ 9,500',
      image: cardImage1
    },
    {
      id: 12,
      category: 'Exposure Camps',
      title: 'Darjeeling - Adventure and Cultural Exposure Camp',
      location: 'Darjeeling',
      duration: '4D/3N',
      price: '₹ 12,500',
      image: cardImage6
    },
    { id: 13, category: 'Exposure Camps', image: salebanner },
    {
      id: 14,
      category: 'Exposure Camps',
      title: 'Udaipur - Nature and Team-building Exposure Camp',
      location: 'Udaipur',
      duration: '3D/2N',
      price: '₹ 8,500',
      image: cardImage7
    },
    {
      id: 15,
      category: 'Exposure Camps',
      title: 'Hampi - Cultural and Ecotourism Exposure Camp',
      location: 'Hampi',
      duration: '4D/3N',
      price: '₹ 13,000',
      image: cardImage9
    },
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
    'Religious'
  ]

  // Filter cards based on selected option
  const filteredCards = cardsData
    .filter(card => card.category === selectedOption)
    .slice(0, 5)

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
  }

  return (
    <div className='hidden md:flex bg-gray-900 py-20 '>
      {/* Left section (1/4) */}
      <div className='w-1/4 p-8 border-r bg-white rounded-2xl'>
        <h2 className='text-2xl font-semibold mb-4 text-left'>
          Select from our tours
        </h2>
        <div>
          {options.map(option => (
            <label
              key={option}
              className='flex items-center mb-5 cursor-pointer text-sm'
            >
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
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                )}
              </span>
              <span
                className={
                  selectedOption === option
                    ? 'text-black font-semibold'
                    : 'text-gray-600'
                }
              >
                {option}
              </span>
              {selectedOption === option && (
                <Link
                  href='/view-all'
                  className='text-blue-500 ml-2 text-xs flex items-center'
                >
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
                        <h3 className='text-xl font-semibold text-left'>
                          {card.title}
                        </h3>
                        <p className='px-2 py-1 text-left mt-6 rounded-full flex items-center border border-white inline-block text-xs'>
                          <IoLocationSharp size={16} className='mr-1' />{' '}
                          {card.location}
                        </p>
                      </div>

                      <div className='flex justify-between w-full px-6 mt-10'>
                        <span className='font-semibold text-lg flex items-center'>
                          <span className='text-base'> Starting Cost: </span>
                          <span className='italic flex items-center ml-2 font-bold text-xl'>
                            {card.price}
                          </span>
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
                        <h3 className='text-xl font-semibold text-left'>
                          {card.title}
                        </h3>
                        <p className='px-2 py-1 text-left mt-6 rounded-full flex items-center border border-white inline-block text-xs'>
                          <IoLocationSharp size={16} className='mr-1' />{' '}
                          {card.location}
                        </p>
                      </div>

                      <div className='flex justify-between w-full px-6 mt-10'>
                        <span className='font-semibold text-lg flex items-center'>
                          <span className='text-base'> Starting Cost: </span>
                          <span className='italic flex items-center ml-2 font-bold text-xl'>
                            {card.price}
                          </span>
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
            <p className='text-center text-gray-300'>
              No cards found for the selected option.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterTrips
