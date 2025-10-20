'use client'
export interface TourPackage {
  id: number
  name: string
  description: string
  price: number
  stateId: number
  cityId: number
  touristSpotId: number | null
  createdAt: string
  image?: string
  duration?: string
  meals: boolean
  stars: number
  sightseeing: boolean
  startingCity: string
  endingCity: string
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
import { FaArrowLeftLong, FaLocationDot } from 'react-icons/fa6'
import { IoLocationOutline } from 'react-icons/io5'
import { FaRegBuilding, FaBinoculars } from 'react-icons/fa'
import { GiMeal } from 'react-icons/gi'
import Link from 'next/link'
import indiaLocations from '../public/data/india_locations.json'
import Image from 'next/image'
import heroImage from '../public/assets/hero1.jpg'
import CustomizeTripForm from './CustomizeTripForm'
import LoginModal from './LoginModal'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Loader from './Loader'
import { useRouter } from 'next/navigation'
import PromoModal from './PromoModal'

import { Yesteryear } from 'next/font/google'

const yesteryear = Yesteryear({
  weight: '400',
  subsets: ['latin'],
})

const Hero = ({
  search,
  setSearch
}: {
  search: boolean
  setSearch: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const packagesRef = useRef<HTMLDivElement>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [displayedText, setDisplayedText] = useState<string>('')
  const fullText = 'Welcome to भ्रMan Sukh'
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const [loading, setLoading] = useState<boolean | null>(null)
  const [tourPackages, setTourPackages] = useState<TourPackage[]>()
  const [showForm, setShowForm] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [pendingSearch, setPendingSearch] = useState<string | null>(null)
  const [showPromo, setShowPromo] = useState(true);

  const router = useRouter()

  const handleOpenForm = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }
  const extractDays = (duration: string): number => {
    // Regular expression to match the number before "Days" or "Nights"
    const match = duration.match(/^(\d+)\s*Days?/i)
    return match ? parseInt(match[1], 10) : 0 // Return the number of days if found, else 0
  }

  const [categories, setCategories] = useState<string[]>([
    'Honeymoon',
    'Family',
    'Solo',
    'Friends'
  ])

  const [durations, setDurations] = useState<string[]>([
    '1 to 3',
    '4 to 6',
    '7 to 9',
    '10 to 12',
    '13 or more'
  ])

  const [budgets, setBudgets] = useState<string[]>([
    'Less Than 10,000',
    '10,000 - 20,000',
    '20,000 - 40,000',
    '40,000 - 60,000',
    '60,000 - 80,000',
    'Above 80,000'
  ])

  const totalPages = tourPackages
    ? Math.ceil(tourPackages.length / itemsPerPage)
    : 0
  const displayedPackages = tourPackages?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
    packagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })

    return () => unsubscribe() // Cleanup on unmount
  }, [])

  const handleExploreClick = async (cityname: string) => {
    if (!user) {
      // If not logged in, show login modal
      setPendingSearch(cityname)
      setShowLoginModal(true)
      return
    }
    performSearch(cityname)
    // setLoading(true);
  }
  const performSearch = async (cityname: string) => {
    setLoading(true)

    try {
      const response = await fetch(
        `/api/searchPackages?searchTerm=${cityname}&categories=${selectedCategories.join(
          ','
        )}&durations=${selectedDurations.join(
          ','
        )}&budgets=${selectedBudgets.join(',')}`
      )
      const text = await response.text()
      console.log('Raw API response:', text)
      const data = JSON.parse(text)
      // console.log("data", data);
      setLoading(false)
      setTourPackages(data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }
  const handleLoginSuccess = () => {
    setShowLoginModal(false)
    if (pendingSearch) {
      performSearch(pendingSearch) // Re-run the search
      setPendingSearch(null)
    }
  }

  const dayNightOptions = ['5D/4N', '6D/5N', '10D/9N', 'Not decided']
  const monthYearOptions = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = async () => {
      try {
        await video.play()
      } catch (error) {
        console.warn('Video autoplay blocked. Retrying on interaction.')
      }
    }

    // Play the video initially
    handlePlay()

    // Observe visibility changes
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handlePlay()
        } else {
          video.pause()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(video)

    return () => observer.disconnect()
  }, [])

  // Track selected filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([])

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    )
  }

  const handleDurationChange = (duration: string) => {
    setSelectedDurations(prev =>
      prev.includes(duration)
        ? prev.filter(item => item !== duration)
        : [...prev, duration]
    )
  }

  const handleBudgetChange = (budget: string) => {
    setSelectedBudgets(prev =>
      prev.includes(budget)
        ? prev.filter(item => item !== budget)
        : [...prev, budget]
    )
  }

  const filteredPackages = displayedPackages?.filter(pkg => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some(category =>
        pkg.name.toLowerCase().includes(category.toLowerCase())
      )

    const matchesDuration =
      selectedDurations.length === 0 ||
      selectedDurations.some(duration => {
        const packageDays = extractDays(pkg.duration || '')
        if (duration === '1 to 3') {
          return packageDays >= 1 && packageDays <= 3
        } else if (duration === '4 to 6') {
          return packageDays >= 4 && packageDays <= 6
        } else if (duration === '7 to 9') {
          return packageDays >= 7 && packageDays <= 9
        } else if (duration === '10 to 12') {
          return packageDays >= 10 && packageDays <= 12
        } else if (duration === '13 or more') {
          return packageDays >= 13
        }
        return false
      })

    const matchesBudget =
      selectedBudgets.length === 0 ||
      selectedBudgets.some(
        budget =>
          (pkg.price < 10000 && budget === 'Less Than 10,000') ||
          (pkg.price >= 10000 &&
            pkg.price <= 20000 &&
            budget === '10,000 - 20,000') ||
          (pkg.price > 20000 &&
            pkg.price <= 40000 &&
            budget === '20,000 - 40,000') ||
          (pkg.price > 40000 &&
            pkg.price <= 60000 &&
            budget === '40,000 - 60,000') ||
          (pkg.price > 60000 &&
            pkg.price <= 80000 &&
            budget === '60,000 - 80,000') ||
          (pkg.price > 80000 && budget === 'Above 80,000')
      )

    return matchesCategory && matchesDuration && matchesBudget
  })

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
    {/* {showPromo && <PromoModal onClose={() => setShowPromo(false)} />} */}
      <div
        className={`relative w-full ${
          search
            ? 'bg-gray-800 py-10'
            : 'md:h-screen h-[500px] overflow-hidden '
        } hero`}
      >
        {/* Hero section */}
        {!search && (
          <Image
            src={heroImage}
            alt='Hero Image'
            className='absolute top-0 left-0 w-full h-full object-cover opacity-80'
            priority
          />
        )}

        {!search && (
          <div className='absolute inset-0 bg-black opacity-50'></div>
        )}

        {/* Search section */}
        <div
          className={`relative z-10 flex flex-col ${
            search ? 'mt-6' : 'mt-48'
          } items-center h-full text-white text-center`}
        >
          {!search && (
           <h1 className="text-2xl md:text-6xl font-bold mb-4">
  {displayedText.includes('Welcome to भ्रMan Sukh') ? (
    <>
      {displayedText.replace('Welcome to भ्रMan Sukh', '')}
      <span
  className={`${yesteryear.className} text-4xl md:text-7xl text-white drop-shadow-lg`}
>
 Welcome to भ्रMan Sukh
</span>
    </>
  ) : (
    displayedText
  )}
</h1>
          )}
          {/* <h1 className="text-2xl md:text-6xl font-bold mb-4">
            Welcome to भ्रMan Sukh
            </h1> */}

          <div
            className={`flex justify-center items-center ${
              search ? 'w-11/12 md:w-3/5' : 'w-11/12 md:w-4/6'
            } space-x-2 bg-gray-200 p-3 rounded-xl`}
          >
            {/* Search input */}
            <div className='relative flex md:w-1/2 w-full'>
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
                      <span className='whitespace-normal text-sm text-left'>
                        {suggestion}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Dropdowns */}
            <select
              required
              defaultValue=''
              className='w-1/5 bg-white text-gray-800 text-sm px-4 py-2 rounded-lg border border-gray-300 hidden md:flex'
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

            <select
              required
              defaultValue=''
              className='w-1/5 bg-white text-gray-800 text-sm px-4 py-2 rounded-lg border border-gray-300 hidden md:flex '
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
                if (!inputValue.trim()) {
                  alert('Please enter a destination before exploring.')
                  return
                }
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
        <div className='flex text-white h-auto bg-gray-800'>
          <div className='w-1/5 p-4 border-r border-gray-700 pl-10 lg:block hidden'>
            {/* Back Button */}
            {/* <button
               onClick={handleBackToHome}
              className="text-white px-4 py-2 rounded-lg mb-4 font-semibold inline-flex items-center underline"
            >
              <FaArrowLeftLong
                className="mr-2 bg-blue-500 rounded-full w-8 p-2 h-8  text-white"
                size={12}
                color="white"
              />{" "}
              Back to Home
            </button> */}
            {/* <h2 className="text-lg font-bold mb-4 text-blue-500">Categories</h2> */}
            {/* <form className="grid grid-cols-2 gap-x-4 gap-y-2 ">
              {categories.map((category, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 text-sm "
                >
                  <input
                    type="checkbox"
                    name="category"
                    value={category}
                    onChange={() => handleCategoryChange(category)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </form> */}

            {/* Duration Filter */}
            <h2 className='text-lg font-bold mb-4 mt-6 text-blue-500'>
              Duration <span className='font-light text-sm'>(in Days)</span>
            </h2>
            <form className='grid grid-cols-2 gap-x-4 gap-y-2'>
              {durations.map((duration, index) => (
                <label
                  key={index}
                  className='flex items-center space-x-2 text-sm'
                >
                  <input
                    type='checkbox'
                    name='duration'
                    value={duration}
                    onChange={() => handleDurationChange(duration)}
                    className='form-checkbox h-4 w-4 text-blue-600'
                  />
                  <span>{duration}</span>
                </label>
              ))}
            </form>

            {/* Budget Filter */}
            <h2 className='text-lg font-bold mb-4 mt-6 text-blue-500'>
              Budget <span className='font-light text-sm'>(in ₹)</span>
            </h2>
            <form className='grid grid-cols-1 gap-x-4 gap-y-3'>
              {budgets.map((budget, index) => (
                <label
                  key={index}
                  className='flex items-center space-x-2 text-sm'
                >
                  <input
                    type='checkbox'
                    name='budget'
                    value={budget}
                    onChange={() => handleBudgetChange(budget)}
                    className='form-checkbox h-4 w-4 text-blue-600'
                  />
                  <span>{budget}</span>
                </label>
              ))}
            </form>
          </div>

          {/* Packages */}
          <div className='w-full lg:w-3/5 px-4 pb-10 lg:pl-16 '>
            <div ref={packagesRef}>
              {loading ? (
                <div className='h-[600px]  flex items-center justify-center'>
                  <Loader />
                </div>
              ) : (
                <div className='flex flex-col space-y-4 py-6'>
                  {filteredPackages?.map(pkg => (
                    <div key={pkg.id}>
                      <Link
                        href={`/package-details/${encodeURIComponent(pkg.id)}`}
                        className='block lg:hidden'
                      >
                        <div className='p-4 border border-gray-700 rounded-xl bg-gray-900 text-white flex space-x-4'>
                          {pkg?.image && (
                            <div className='w-1/4 '>
                              <Image
                                src={pkg.image}
                                alt={pkg.name}
                                className='rounded-md object-cover w-full h-full'
                                width={200}
                                height={200}
                              />
                            </div>
                          )}
                          <div className='w-3/4'>
                            <h2 className='text-sm font-bold'>{pkg?.name}</h2>
                            <div className='flex space-x-2 font-semibold text-xs mt-1'>
                              <p className='text-blue-500'>{pkg?.duration}</p>
                              <div className='border-l border-white' />
                              <p className='text-gray-400'>Customizable</p>
                            </div>
                            <p className='text-sm mt-3'>Starting from:</p>
                            <p className='text-blue-500 font-bold text-base tracking-wide'>
                              ₹{pkg?.price}/-{' '}
                              <span className='text-gray-400 text-xs italic tracking-normal'>
                                Per Person
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                      {/* Desktop version: normal card with buttons */}
                      <div className='hidden lg:flex p-4 border border-gray-700 rounded-xl bg-gray-700 text-white space-x-4 h-64'>
                        {pkg?.image && (
                          <div className='w-1/4 h-full '>
                            <Image
                              src={pkg.image}
                              alt={pkg.name}
                              className='rounded-md object-cover w-full h-full'
                              width={200}
                              height={200}
                            />
                          </div>
                        )}
                        <div className='w-3/4'>
                          <div>
                            <h2 className='text-xl font-bold'>{pkg?.name}</h2>
                            <div className='flex space-x-2 font-semibold text-sm mt-1'>
                              <p className='text-blue-500'>{pkg?.duration} </p>
                              <div className='border-l border-white'></div>
                              <p className='text-gray-400 '>Customizable</p>
                            </div>
                          </div>
                          <div className='mt-8 '>
                            <p className='text-base '>Starting from:</p>
                            <p className='text-blue-500 font-bold text-2xl tracking-wide'>
                              ₹{pkg?.price}/-{' '}
                              <span className='text-gray-400 text-xs italic tracking-normal'>
                                Per Person
                              </span>
                            </p>
                            <p className='text-xs text-white bg-white bg-opacity-20 rounded-full py-1 px-2 border border-white  items-center block inline-flex font-semibold mt-1 '>
                              <span className='mr-1'>
                                <IoLocationOutline />
                              </span>
                              {pkg?.state?.name}
                            </p>
                            <div className='flex justify-between items-center '>
                              <div className='flex items-center space-x-4 mt-5'>
                                <div className='flex items-center flex-col space-y-1'>
                                  <span className='text-white'>
                                    <FaRegBuilding />
                                  </span>
                                  <span className='text-xs font-light'>
                                    Upto {pkg?.stars} stars
                                  </span>
                                </div>
                                <div>
                                  {pkg?.sightseeing ? (
                                    <div className='flex flex-col items-center space-y-1'>
                                      <span className='text-white'>
                                        <FaBinoculars />
                                      </span>
                                      <span className='text-xs font-light '>
                                        Sightseeing
                                      </span>
                                    </div>
                                  ) : (
                                    <span className='text-gray-400'>
                                      No Sightseeing
                                    </span>
                                  )}
                                </div>
                                <div>
                                  {pkg?.meals ? (
                                    <div className='flex flex-col items-center space-y-1'>
                                      <span className='text-white'>
                                        <GiMeal />
                                      </span>
                                      <span className='text-xs font-light '>
                                        Meals
                                      </span>
                                    </div>
                                  ) : (
                                    <span className='text-gray-400'>
                                      No Meals
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className='flex items-center space-x-3 mt-3'>
                                <Link
                                  href={`/package-details/${encodeURIComponent(
                                    pkg.id
                                  )}`}
                                  className='bg-blue-500 text-xs py-2 px-3 rounded-lg font-semibold'
                                >
                                  View Details
                                </Link>
                                <button
                                  onClick={handleOpenForm}
                                  className='bg-gray-400 text-xs py-2 px-3 rounded-lg font-semibold'
                                >
                                  Customize Plan
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Pagination Controls */}
                  <div className='flex items-center justify-center space-x-4 mt-6'>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 ${
                        currentPage === 1 ? 'bg-gray-500' : 'bg-blue-600'
                      } text-white lg:text-sm text-xs lg:rounded rounded-full`}
                    >
                      Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 ${
                          currentPage === index + 1
                            ? 'bg-blue-800'
                            : 'bg-blue-600'
                        } text-white lg:text-sm text-xs lg:rounded rounded-full`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 ${
                        currentPage === totalPages
                          ? 'bg-gray-500'
                          : 'bg-blue-600'
                      } text-white lg:text-sm text-xs lg:rounded rounded-full`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {showForm && (
        <CustomizeTripForm onClose={handleCloseForm} destination={''} />
      )}
      <LoginModal isOpen={showLoginModal} onClose={handleLoginSuccess} />
    </>
  )
}

export default Hero
