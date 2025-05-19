'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  FaPhoneAlt,
  FaUserPlus,
  FaChevronDown,
  FaChevronUp,
  FaArrowRight,
  FaBars
} from 'react-icons/fa'
import { IoMdClose, IoIosArrowDown } from 'react-icons/io'
import logo from '../public/assets/logo.png' // Logo placed in 'public/assets'
import CustomizeTripForm from './CustomizeTripForm'
import { auth, db } from '../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

interface Props {
  selectedOption: string
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
  selectedPackage: string
  setSelectedPackage: React.Dispatch<React.SetStateAction<string>>
  setSearch: React.Dispatch<React.SetStateAction<boolean>> // Accept setSearch
}

const Navbar: React.FC<Props> = ({
  selectedOption,
  setSelectedOption,
  selectedPackage,
  setSelectedPackage,
  setSearch
}) => {
  const [dropdowns, setDropdowns] = useState({
    holiday: false,
    themes: false
  })

  const [dropdownAlignment, setDropdownAlignment] = useState<'left' | 'right'>(
    'right'
  )
  const holidayDropdownRef = useRef<HTMLDivElement | null>(null)
  const [userInitials, setUserInitials] = useState<string | null>(null)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const userDropdownRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()
  const themes = usePathname()
  const isLoginPage = themes === '/login' || themes === '/signup'

  useEffect(() => {
    const fetchUserData = async (uid: string) => {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        const fullName = userDoc.data().fullName || ''
        const initials = fullName
          .split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
        setUserInitials(initials)
      }
    }

    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        await fetchUserData(user.uid)
      } else {
        setUserInitials(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await auth.signOut()
    setUserInitials(null)
    router.push('/')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleDropdownAlignment = () => {
      const dropdown = holidayDropdownRef.current

      if (dropdown) {
        const rect = dropdown.getBoundingClientRect()

        if (rect.right > window.innerWidth) {
          setDropdownAlignment('left')
        } else {
          setDropdownAlignment('right')
        }
      }
    }

    window.addEventListener('resize', handleDropdownAlignment)
    handleDropdownAlignment() // Check alignment initially

    return () => {
      window.removeEventListener('resize', handleDropdownAlignment)
    }
  }, [])

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({
    themes: null,
    holiday: null,
    guides: null
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(dropdowns).forEach(key => {
        const ref = dropdownRefs.current[key]
        if (ref && !ref.contains(event.target as Node)) {
          setDropdowns(prev => ({ ...prev, [key]: false }))
        }
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdowns])

  // Disable scrolling when the form is open
  useEffect(() => {
    if (isFormOpen || isMenuOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [isFormOpen, isMenuOpen])

  const toggleDropdown = (name: keyof typeof dropdowns) => {
    setDropdowns(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  const handleOpenForm = () => setIsFormOpen(true)
  const handleCloseForm = () => setIsFormOpen(false)

  const handleToggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const handleCloseMenu = () => setIsMenuOpen(false)

  const handleSelectOption = (option: string) => {
    setSelectedOption(option)

    // Scroll to FilterTrips
    const filterTripsSection = document.getElementById('filter-trips')
    if (filterTripsSection) {
      filterTripsSection.scrollIntoView({ behavior: 'smooth' })
    }
    setDropdowns({ themes: false, holiday: false })
  }
  const handleSelectPackage = (state: string) => {
    setSelectedPackage(state) // Set selected state (if needed)

    // Scroll to the statecarousel section
    const stateCarouselSection = document.getElementById('statecarousel')
    if (stateCarouselSection) {
      stateCarouselSection.scrollIntoView({ behavior: 'smooth' })
    }
    setDropdowns({ themes: false, holiday: false })
  }

  return (
    <div className={isFormOpen || isMenuOpen ? 'relative overflow-hidden' : ''}>
      <nav
        className={`w-full text-white p-2 bg-gray-900 ${
          isFormOpen || isMenuOpen ? 'blur-sm' : ''
        }`}
      >
        <div
          className={`container mx-auto flex items-center justify-between ${
            isLoginPage ? 'py-4' : ''
          }`}
        >
          {/* Logo Section */}
          <div className='text-2xl font-semibold cursor-pointer'>
            <Image
              src={logo}
              alt='Logo'
              width={192}
              height={96}
              className='w-36 pl-2'
              onClick={() => {
                setSearch(false) // Hide the search section
                router.push('/') // Navigate to the landing page
              }}
            />
          </div>

          {/* Hamburger Menu */}
          <div className='md:hidden'>
            <button onClick={handleToggleMenu} className='text-white text-3xl'>
              <FaBars />
            </button>
          </div>

          <div className='hidden md:flex flex-col'>
            {/* First Row */}
            <div className={`flex justify-end `}>
              <div className={`flex space-x-6 mb-1 text-xs`}>
                <span className='hover:text-gray-400 flex items-center cursor-pointer'>
                  <FaPhoneAlt className='mr-2' />
                  +91 9953786506
                </span>
                <button
                  className='hover:text-gray-400 pointer-events-none opacity-50 flex items-center'
                  disabled
                >
                  <FaUserPlus className='mr-2' />
                  Travel Agent? Join Us
                </button>
                <Link
                  href='/'
                  className='hover:text-gray-400 flex items-center'
                >
                  Home
                </Link>
                <Link
                  href='/about'
                  prefetch={true}
                  className='hover:text-gray-400 flex items-center'
                >
                  About Us
                </Link>
                {userInitials ? (
                  <div className='relative' ref={userDropdownRef}>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className='bg-blue-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center font-bold uppercase'
                    >
                      {userInitials}
                    </button>
                    {isUserDropdownOpen && (
                      <div className='absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-50'>
                        <button
                          onClick={handleLogout}
                          className='block w-full text-left px-4 py-2 hover:bg-gray-200'
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href='/login'
                    className='bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-sm font-semibold'
                  >
                    Log In
                  </Link>
                )}
              </div>
            </div>

            {/* Second Row */}
            {themes === '/' && (
              <div className='flex mb-1'>
                <div className='flex space-x-6 mt-2  items-center'>
                  {[
                    { name: 'themes', label: 'Holiday Themes' },
                    { name: 'holiday', label: 'Holiday Packages' }
                  ].map(item => (
                    <div
                      key={item.name}
                      className={`relative ${
                        dropdowns[item.name as keyof typeof dropdowns]
                          ? 'border-b-4 border-blue-500 '
                          : ''
                      }`}
                      ref={el => {
                        dropdownRefs.current[item.name] = el // Corrected callback
                      }}
                    >
                      <div
                        className=' flex items-center cursor-pointer'
                        onClick={() =>
                          toggleDropdown(item.name as keyof typeof dropdowns)
                        }
                      >
                        {item.label}
                        {dropdowns[item.name as keyof typeof dropdowns] ? (
                          <FaChevronUp className='ml-1' />
                        ) : (
                          <FaChevronDown className='ml-1' />
                        )}
                      </div>
                      {dropdowns[item.name as keyof typeof dropdowns] && (
                        <div
                          className={`absolute ${
                            dropdownAlignment === 'right' ? 'right-0' : 'left-0'
                          } mt-4 bg-white border border-gray-300 font-medium text-sm rounded shadow-lg z-50 w-[500px] h-[400px]`}
                        >
                          {item.name === 'themes' ? (
                            <div className='p-8 grid grid-cols-2 pt-8  gap-y-4  '>
                              <div>
                                <button
                                  className='block p-2 hover:text-blue-500 text-black'
                                  onClick={() =>
                                    handleSelectOption('Strangers Unite')
                                  }
                                >
                                  Strangers Unite
                                </button>
                                <button
                                  onClick={() =>
                                    handleSelectOption('Therapy Travels')
                                  }
                                  className='block p-2 hover:text-blue-500 text-black'
                                >
                                  Therapy Travels
                                </button>
                                <button
                                  onClick={() =>
                                    handleSelectOption('Exposure Camps')
                                  }
                                  className='block p-2 hover:text-blue-500 text-black'
                                >
                                  Exposure Camps
                                </button>
                                <button
                                  className='block p-2 hover:text-blue-500 text-black'
                                  onClick={() =>
                                    handleSelectOption('Seasonal Packages')
                                  }
                                >
                                  Seasonal Packages
                                </button>
                                <button
                                  onClick={() =>
                                    handleSelectOption('Adventure')
                                  }
                                  className='block p-2 hover:text-blue-500 text-black'
                                >
                                  Adventure
                                </button>
                                <button
                                  onClick={() => handleSelectOption('Family')}
                                  className='block p-2 hover:text-blue-500 text-black'
                                >
                                  Family
                                </button>
                              </div>

                              <div className='pl-8 border-l border-blue-500'>
                                <button
                                  onClick={() => handleSelectOption('Nature')}
                                  className='block p-2 hover:text-blue-500 text-black'
                                >
                                  Nature
                                </button>
                                <button
                                  onClick={() =>
                                    handleSelectOption('Honeymoon')
                                  }
                                  className='block p-2 hover:text-blue-500 text-black'
                                >
                                  Honeymoon
                                </button>
                                <button
                                  onClick={() => handleSelectOption('Wildlife')}
                                  className='block p-2 hover:text-blue-500 text-black'
                                >
                                  Wildlife
                                </button>
                                <button
                                  onClick={() => handleSelectOption('Friends')}
                                  className='block p-2 hover:text-blue-500 text-black'
                                >
                                  Friends
                                </button>
                                <button
                                  onClick={() =>
                                    handleSelectOption('Water Activities')
                                  }
                                  className='block p-2 hover:text-blue-500 text-black'
                                >
                                  Water Activities
                                </button>
                                <button
                                  onClick={() =>
                                    handleSelectOption('Religious')
                                  }
                                  className='block p-2 hover:text-blue-500 text-black'
                                >
                                  Religious
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className='p-2 grid grid-cols-2  pt-8 pl-4'>
                              <div>
                                <h4 className='text-blue-500  font-bold mb-2'>
                                  Indian Destinations
                                </h4>
                                <ul className='list-disc pl-5 text-black'>
                                  <li>
                                    <button
                                      className='hover:text-blue-400 block p-2'
                                      onClick={() =>
                                        handleSelectPackage('Rajasthan')
                                      }
                                    >
                                      Goa
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() =>
                                        handleSelectPackage('Kerala')
                                      }
                                      className='hover:text-blue-400 block p-2'
                                    >
                                      Arunachal Pradesh
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() => handleSelectPackage('Goa')}
                                      className='hover:text-blue-400 block p-2'
                                    >
                                      Andaman & Nicobar
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() =>
                                        handleSelectPackage('Himachal Pradesh')
                                      }
                                      className='hover:text-blue-400 block p-2'
                                    >
                                      Himachal Pradesh
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      onClick={() =>
                                        handleSelectPackage('Tamil Nadu')
                                      }
                                      className='hover:text-blue-400 block p-2'
                                    >
                                      Karnataka
                                    </button>
                                  </li>
                                </ul>
                                <button
                                  onClick={() =>
                                    handleSelectPackage('Indian Destination')
                                  }
                                  className='block mt-2 pl-6 text-blue-500 underline flex items-center '
                                >
                                  View All{' '}
                                  <FaArrowRight className='ml-1 ' size={10} />
                                </button>
                              </div>
                              <div className='border-l border-blue-500 pl-4'>
                                <h4 className='text-blue-500 font-bold mb-2 '>
                                  International Destinations
                                </h4>
                                <ul className='list-disc pl-5 text-black'>
                                  <li>
                                    <Link
                                      href='/maldives'
                                      className='hover:text-blue-400 block p-2 pointer-events-none opacity-50'
                                      onClick={e => e.preventDefault()}
                                      aria-disabled='true'
                                    >
                                      Maldives
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href='/singapore'
                                      className='hover:text-blue-400 block p-2 pointer-events-none opacity-50'
                                      onClick={e => e.preventDefault()}
                                      aria-disabled='true'
                                    >
                                      Singapore
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href='/thailand'
                                      className='hover:text-blue-400 block p-2 pointer-events-none opacity-50'
                                      onClick={e => e.preventDefault()}
                                      aria-disabled='true'
                                    >
                                      Thailand
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href='/dubai'
                                      className='hover:text-blue-400 block p-2 pointer-events-none opacity-50'
                                      onClick={e => e.preventDefault()}
                                      aria-disabled='true'
                                    >
                                      Dubai
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      href='/switzerland'
                                      className='hover:text-blue-400 block p-2 pointer-events-none opacity-50'
                                      onClick={e => e.preventDefault()}
                                      aria-disabled='true'
                                    >
                                      Switzerland
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Spacer */}
                  <span className='mx-4 border-l border-gray-500 h-6'></span>
                </div>

                <div className='flex ml-6 space-x-6 mt-2 items-center'>
                  {/* Plan My Holiday */}
                  <button
                    onClick={handleOpenForm}
                    className='bg-blue-600 px-4 py-2 rounded hover:bg-blue-700'
                  >
                    Customize My Trip
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='fixed inset-0 bg-white bg-opacity-90 z-50 text-black w-2/3'>
          <div className='flex justify-between items-center p-2'>
            <div className='text-2xl'>
              <Link href='/'>
                <Image src={logo} alt='Logo' width={96} height={48} />
              </Link>
            </div>
            <button
              onClick={handleCloseMenu}
              className='text-3xl text-black focus:outline-none absolute right-2 top-2 rounded border shadow-xl'
            >
              <IoMdClose />
            </button>
          </div>
          <div className='flex flex-col text-left h-screen flex-start space-y-6 text-lg px-8 pt-10'>
            <button
              onClick={() => {
                router.push('/')
              }}
              className='hover:text-blue-500 text-left font-semibold'
            >
              Home
            </button>
            <Link
              href='/about'
              prefetch={true}
              className='hover:text-blue-500 text-left font-semibold'
            >
              About Us
            </Link>
            {themes === '/' && (
              <>
                <button
                  onClick={() => {
                    toggleDropdown('themes')
                    handleCloseMenu()
                  }}
                  className='hover:text-blue-500 text-left font-semibold'
                >
                  Holiday Themes
                </button>
                <button
                  onClick={() => {
                    toggleDropdown('holiday')
                    handleCloseMenu()
                  }}
                  className='hover:text-blue-500 text-left font-semibold'
                >
                  Holiday Packages
                </button>

                <button
                  onClick={() => {
                    handleOpenForm()
                    handleCloseMenu()
                  }}
                  className='bg-blue-600 text-white  px-4 py-2 rounded hover:bg-blue-700 font-semibold'
                >
                  Customize My Trip
                </button>
              </>
            )}

            <Link
              href={userInitials ? '#' : '/login'} // Disable link if logged in
              onClick={userInitials ? handleLogout : undefined} // Handle logout on click
              className={`px-4 py-2 text-center font-semibold rounded 
    ${
      userInitials
        ? 'bg-red-600 text-white hover:bg-red-700 cursor-pointer'
        : 'bg-blue-600 text-white hover:bg-blue-700'
    }`}
            >
              {userInitials ? 'Logout' : 'Login'}
            </Link>
          </div>
        </div>
      )}
      {/* Modal Form */}
      {isFormOpen && (
        <CustomizeTripForm onClose={handleCloseForm} destination={''} />
      )}
    </div>
  )
}

export default Navbar
