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

const Navbar: React.FC = () => {
  const [dropdowns, setDropdowns] = useState({
    holiday: false,
    guides: false,
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
    router.push('/login')
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

  return (
    <div className={isFormOpen || isMenuOpen ? 'relative overflow-hidden' : ''}>
      <nav
        className={`w-full text-white p-2 bg-black ${
          isFormOpen || isMenuOpen ? 'blur-sm' : ''
        }`}
      >
        <div className='container mx-auto flex items-center justify-between'>
          {/* Logo Section */}
          <div className='text-2xl font-semibold '>
            <Link href='/'>
              <Image
                src={logo}
                alt='Logo'
                width={192}
                height={96}
                className='w-36 pl-2'
              />
            </Link>
          </div>

          {/* Hamburger Menu */}
          <div className='md:hidden'>
            <button onClick={handleToggleMenu} className='text-white text-3xl'>
              <FaBars />
            </button>
          </div>

          <div className='hidden md:flex flex-col'>
            {/* First Row */}
            <div className='flex justify-end'>
              <div className='flex space-x-6 mb-1 text-xs'>
                <a
                  href='tel:+919953786506'
                  className='hover:text-gray-400 flex items-center'
                >
                  <FaPhoneAlt className='mr-2' />
                  +91 9953786506
                </a>
                <button className='hover:text-gray-400 flex items-center'>
                  <FaUserPlus className='mr-2' />
                  Travel Agent? Join Us
                </button>
                <Link
                  href='/blogs'
                  className='hover:text-gray-400 flex items-center'
                >
                  Blogs
                </Link>
                <Link
                  href='/about'
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
                    href='/signup'
                    className='bg-blue-600 px-4 py-2 rounded hover:bg-blue-700'
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            </div>

            {/* Second Row */}
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
                              <Link
                                href='/strangers-unite'
                                className='block p-2 hover:text-blue-500 text-black'
                              >
                                Strangers Unite
                              </Link>
                              <Link
                                href='/therapy-travels'
                                className='block p-2 hover:text-blue-500 text-black'
                              >
                                Therapy Travels
                              </Link>
                              <Link
                                href='/exposure-camps'
                                className='block p-2 hover:text-blue-500 text-black'
                              >
                                Exposure Camps
                              </Link>
                              <Link
                                href='/seasonal-packages'
                                className='block p-2 hover:text-blue-500 text-black'
                              >
                                Seasonal Packages
                              </Link>
                              <Link
                                href='/adventure'
                                className='block p-2 hover:text-blue-500 text-black'
                              >
                                Adventure
                              </Link>
                              <Link
                                href='/family'
                                className='block p-2 hover:text-blue-500 text-black'
                              >
                                Family
                              </Link>
                            </div>

                            <div className='pl-8 border-l border-blue-500'>
                              <Link
                                href='/nature'
                                className='block p-2 hover:text-blue-500 text-black'
                              >
                                Nature
                              </Link>
                              <Link
                                href='/honeymoon'
                                className='block p-2 hover:text-blue-500 text-black'
                              >
                                Honeymoon
                              </Link>
                              <Link
                                href='/wildlife'
                                className='block p-2 hover:text-blue-500 text-black'
                              >
                                Wildlife
                              </Link>
                              <Link
                                href='/friends'
                                className='block p-2 hover:text-blue-500 text-black'
                              >
                                Friends
                              </Link>
                              <Link
                                href='/water-activities'
                                className='block p-2 hover:text-blue-500 text-black'
                              >
                                Water Activities
                              </Link>
                              <Link
                                href='/religious'
                                className='block p-2 hover:text-blue-500 text-black'
                              >
                                Religious
                              </Link>
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
                                  <Link
                                    href='/rajasthan'
                                    className='hover:text-blue-400 block p-2'
                                  >
                                    Rajasthan
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href='/kerala'
                                    className='hover:text-blue-400 block p-2'
                                  >
                                    Kerala
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href='/goa'
                                    className='hover:text-blue-400 block p-2'
                                  >
                                    Goa
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href='/himachal-pradesh'
                                    className='hover:text-blue-400 block p-2'
                                  >
                                    Himachal Pradesh
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href='/tamil-nadu'
                                    className='hover:text-blue-400 block p-2'
                                  >
                                    Tamil Nadu
                                  </Link>
                                </li>
                              </ul>
                              <Link
                                href='/indian-destinations'
                                className='block mt-2 pl-6 text-blue-500 underline flex items-center '
                              >
                                View All{' '}
                                <FaArrowRight className='ml-1 ' size={10} />
                              </Link>
                            </div>
                            <div className='border-l border-blue-500 pl-4'>
                              <h4 className='text-blue-500 font-bold mb-2 '>
                                International Destinations
                              </h4>
                              <ul className='list-disc pl-5 text-black'>
                                <li>
                                  <Link
                                    href='/maldives'
                                    className='hover:text-blue-400 block p-2'
                                  >
                                    Maldives
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href='/singapore'
                                    className='hover:text-blue-400 block p-2'
                                  >
                                    Singapore
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href='/thailand'
                                    className='hover:text-blue-400 block p-2'
                                  >
                                    Thailand
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href='/dubai'
                                    className='hover:text-blue-400 block p-2'
                                  >
                                    Dubai
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href='/switzerland'
                                    className='hover:text-blue-400 block p-2'
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
                {/* {[{ name: 'guides', label: 'Destination Guides' }].map(item => (
                  <div
                    key={item.name}
                    className={`relative ${
                      dropdowns[item.name as keyof typeof dropdowns]
                        ? 'border-b-4 border-blue-500 '
                        : ''
                    }`}
                    ref={el => {
                      dropdownRefs.current[item.name] = el
                    }}
                  >
                    <div
                      className=' flex items-center cursor-pointer'
                      onClick={e => {
                        e.preventDefault()
                        toggleDropdown(item.name as keyof typeof dropdowns)
                      }}
                    >
                      {item.label}
                      {dropdowns[item.name as keyof typeof dropdowns] ? (
                        <FaChevronUp className='ml-1' />
                      ) : (
                        <FaChevronDown className='ml-1' />
                      )}
                    </div>
                    {dropdowns[item.name as keyof typeof dropdowns] && (
                      <div className='absolute left-0 w-48 text-xs mt-4 bg-white border border-gray-300 rounded shadow-lg z-10'>
                        <Link
                          href='/option1'
                          className='p-2 hover:text-blue-500 text-black block'
                        >
                          Option 1
                        </Link>
                        <Link
                          href='/option2'
                          className='p-2 hover:text-blue-500 text-black block'
                        >
                          Option 2
                        </Link>
                        <Link
                          href='/option3'
                          className='p-2 hover:text-blue-500 text-black block'
                        >
                          Option 3
                        </Link>
                      </div>
                    )}
                  </div>
                ))} */}

                {/* Plan My Holiday */}
                <button
                  onClick={handleOpenForm}
                  className='bg-blue-600 px-4 py-2 rounded hover:bg-blue-700'
                >
                  Customize My Trip
                </button>
              </div>
            </div>
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
                toggleDropdown('guides')
                handleCloseMenu()
              }}
              className='hover:text-blue-500 text-left font-semibold'
            >
              Destination Guides
            </button>
            <button
              onClick={handleOpenForm}
              className='bg-blue-600 text-white  px-4 py-2 rounded hover:bg-blue-700 font-semibold'
            >
              Customize My Trip
            </button>
            <Link
              href='/login'
              className='bg-blue-600 px-4 py-2 text-white text-center font-semibold rounded hover:bg-blue-700'
            >
              Login
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
