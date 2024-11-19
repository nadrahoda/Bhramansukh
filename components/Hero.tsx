'use client'
// types.ts
export interface TourPackage {
  id: number
  name: string
  description: string
  price: number
  stateId: number
  cityId: number
  touristSpotId: number | null
  createdAt: string
  state: {
    id: number
    name: string
  }
  city: {
    id: number
    name: string
    stateId: number
  }
  touristSpot: {
    id: number
    name: string
    cityId: number
  } | null
}
import React, { useState, useEffect, useRef } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import Link from 'next/link'
import indiaLocations from '../public/data/india_locations.json'
const Hero = ({
  search,
  setSearch
}: {
  search: boolean
  setSearch: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [displayedText, setDisplayedText] = useState<string>('')
  const fullText = 'Welcome to भ्रMan Sukh'
  const [loading, setLoading] = useState<boolean | null>(null)
  const [tourPackages, setTourPackages] = useState<TourPackage[]>()
  const [categories] = useState<string[]>([
    'Honeymoon',
    'Family',
    'Solo',
    'Friends'
  ])
  const [durations] = useState<string[]>([
    '1 to 3',
    '4 to 6',
    '7 to 9',
    '10 to 12',
    '13 or more'
  ])
  const [budgets] = useState<string[]>([
    'Less Than 10,000',
    '10,000 - 20,000',
    '20,000 - 40,000',
    '40,000 - 60,000',
    '60,000 - 80,000',
    'Above 80,000'
  ])
  const handleExploreClick = async (cityname: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/searchPackages?searchTerm=${cityname}`)
      const data = await response.json()
      console.log('data', data)
      setLoading(false)
      setTourPackages(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1))
      index++
      if (index >= fullText.length) {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const dayNightOptions = ['5D/4N', '6D/5N', '10D/9N', 'Not decided']
  const monthYearOptions = [
    'December 2024',
    'January 2025',
    'February 2025',
    'March 2025',
    'April 2025',
    'May 2025'
  ]

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (value.length < 2) {
      setSuggestions([])
      return
    }

    const filteredSuggestions = new Set<string>()
    indiaLocations.forEach((location: any) => {
      if (location.state.toLowerCase().includes(value.toLowerCase())) {
        filteredSuggestions.add(location.state)
      }
      location.cities.forEach((city: string) => {
        if (city.toLowerCase().includes(value.toLowerCase())) {
          filteredSuggestions.add(`${city} , ${location.state}`)
        }
      })
      location.touristSpots.forEach((spotObj: any) => {
        const cityName = Object.keys(spotObj)[0]
        const spots = spotObj[cityName]
        if (cityName.toLowerCase().includes(value.toLowerCase())) {
          spots.forEach((spot: string) => {
            filteredSuggestions.add(`${spot} , ${location.state}`)
          })
        } else {
          spots.forEach((spot: string) => {
            if (spot.toLowerCase().includes(value.toLowerCase())) {
              filteredSuggestions.add(`${spot} , ${location.state}`)
            }
          })
        }
      })
    })
    setSuggestions(Array.from(filteredSuggestions))
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    setSuggestions([])
  }

  return (
    <>
      <div
        className={`relative w-full ${
          search ? 'bg-gray-900 py-10' : 'h-screen overflow-hidden'
        } hero`}
      >
        {!search && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            className='absolute top-0 left-0 w-full h-full object-cover'
          >
            <source src='/assets/hero.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        )}

        {!search && (
          <div className='absolute inset-0 bg-black opacity-50'></div>
        )}
        <div
          className={`relative z-10 flex flex-col ${
            search ? 'mt-10' : 'mt-48'
          } items-center h-full text-white text-center`}
        >
          {!search && (
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>
              {displayedText}
            </h1>
          )}
          <div
            className={`flex justify-center items-center ${
              search ? 'w-full md:w-3/5' : 'w-11/12 md:w-4/6'
            } space-x-2 bg-gray-200 p-3 rounded-xl`}
          >
            <div className='relative flex w-1/2'>
              <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
                <FaLocationDot className='text-blue-500 mr-2' size={18} />
              </span>
              <input
                type='text'
                placeholder='Search your destination'
                value={inputValue}
                onChange={handleInputChange}
                autoComplete='off'
                className='pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full text-black text-sm'
              />

              {suggestions.length > 0 && (
                <div className='absolute z-10 bg-white border border-gray-300 rounded-lg mt-10 w-full max-h-60 overflow-y-auto'>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className='p-2 hover:bg-gray-200 cursor-pointer text-black flex items-center pl-2'
                    >
                      <FaLocationDot className='text-gray-400 mr-2' size={16} />
                      <span className='whitespace-normal text-sm'>
                        {suggestion}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Day/Night Dropdown */}
            <select
              required
              defaultValue=''
              className='w-1/5 bg-white text-gray-800 text-sm px-4 py-2 rounded-lg border border-gray-300'
            >
              <option value='' disabled>
                Duration
              </option>
              {dayNightOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {/* Month/Year Dropdown */}
            <select
              required
              defaultValue=''
              className='w-1/5 bg-white text-gray-800 text-sm px-4 py-2 rounded-lg border border-gray-300'
            >
              <option value='' disabled>
                Select Month
              </option>
              {monthYearOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                handleExploreClick(inputValue.split(',')[0].trim())
                setSearch(true)
              }}
              className='w-1/5 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm h-full flex items-center justify-center w-1/5'
            >
              Explore
            </button>
          </div>
        </div>
      </div>
      {/* Searched Section */}
      {search && (
        <div className='flex bg-gray-900 text-white h-auto'>
          {/* Left Section */}
          <div className='w-1/5 p-4 border-r border-gray-700 pl-10 pt-6'>
            <h2 className='text-lg font-bold mb-4'>Categories</h2>
            <form className='grid grid-cols-2 gap-x-4 gap-y-2'>
              {/* Category options as checkboxes */}
              {categories.map((category, index) => (
                <label
                  key={index}
                  className='flex items-center space-x-2 text-sm'
                >
                  <input
                    type='checkbox'
                    name='category'
                    value={category}
                    className='form-checkbox h-4 w-4 text-blue-600'
                  />
                  <span>{category}</span>
                </label>
              ))}
            </form>

            {/* Divider line */}
            <div className='border-t border-gray-600 my-6'></div>

            <h2 className='text-lg font-bold mb-4'>
              Duration <span className='font-light text-sm'>(in Days)</span>
            </h2>
            <form className='grid grid-cols-2 gap-x-4 gap-y-2'>
              {/* Filter options as checkboxes */}
              {durations.map((duration, index) => (
                <label
                  key={index}
                  className='flex items-center space-x-2 text-sm'
                >
                  <input
                    type='checkbox'
                    name='filter'
                    value={duration}
                    className='form-checkbox h-4 w-4 text-blue-600'
                  />
                  <span>{duration}</span>
                </label>
              ))}
            </form>
            {/* Divider line */}
            <div className='border-t border-gray-600 my-6'></div>

            <h2 className='text-lg font-bold mb-4'>
              Duration <span className='font-light text-sm'>(in Days)</span>
            </h2>
            <form className='grid grid-cols-1 gap-x-4 gap-y-3'>
              {/* Filter options as checkboxes */}
              {budgets.map((budget, index) => (
                <label
                  key={index}
                  className='flex items-center space-x-2 text-sm'
                >
                  <input
                    type='checkbox'
                    name='filter'
                    value={budget}
                    className='form-checkbox h-4 w-4 text-blue-600'
                  />
                  <span>{budget}</span>
                </label>
              ))}
            </form>
          </div>

          {/* Right Section */}
          <div className='w-4/5 px-4 pb-10'>
            {loading ? (
              <div>Searching...</div>
            ) : (
              <div className='flex flex-col space-y-4'>
                {tourPackages && tourPackages?.length > 0 && (
                  <h1 className='text-2xl font-bold pb-4'>
                    Showing{' '}
                    <span className='text-blue-500 italic'>
                      {tourPackages[0]?.city?.name},{' '}
                      {tourPackages[0]?.state?.name}
                    </span>{' '}
                    Tour Packages
                  </h1>
                )}

                {tourPackages?.map(pkg => (
                  <Link
                    key={pkg.id}
                    href={`/package-details/${encodeURIComponent(pkg.id)}`}
                  >
                    <div className='p-4 border rounded-md bg-white text-black'>
                      <h2 className='text-xl font-bold'>{pkg?.name}</h2>
                      <p>{pkg?.description}</p>
                      <p>Price: ₹{pkg?.price.toFixed(2)}</p>
                      <p>
                        Location: {pkg?.city?.name}, {pkg?.state?.name}
                      </p>
                      {pkg?.touristSpot && (
                        <p>Spot: {pkg?.touristSpot?.name}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Hero
