'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  FaPhoneAlt,
  FaUserPlus,
  FaChevronDown,
  FaChevronUp,
  FaArrowRight
} from 'react-icons/fa'
import logo from '../public/assets/logo.png' // Logo placed in 'public/assets'
import CustomizeTripForm from './CustomizeTripForm'

const Navbar: React.FC = () => {
  const [dropdowns, setDropdowns] = useState({
    holiday: false,
    guides: false,
    themes: false
  })

  const [isFormOpen, setIsFormOpen] = useState(false)
  

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
    if (isFormOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [isFormOpen])


  const toggleDropdown = (name: keyof typeof dropdowns) => {
    setDropdowns(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  const handleOpenForm = () => setIsFormOpen(true)
  const handleCloseForm = () => setIsFormOpen(false)

  return (
    <div className={isFormOpen ? 'relative overflow-hidden': ''}>
    <nav className={`w-full text-white p-2 bg-black ${isFormOpen ? 'blur-sm': ''}`}>
      <div className='container mx-auto flex items-center justify-between'>
        {/* Logo Section */}
        <div className='text-2xl font-semibold'>
          <Link href='/'>
            <Image src={logo} alt='Logo' width={96} height={48} />
          </Link>
        </div>

        <div className='flex flex-col'>
          {/* First Row */}
          <div className='flex justify-end'>
            <div className='flex space-x-6 mb-2 text-xs'>
              <a
                href='tel:+911234567890'
                className='hover:text-gray-400 flex items-center'
              >
                <FaPhoneAlt className='mr-2' />
                +91 1234567890
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
              <Link
                href='/login'
                className='bg-blue-600 px-4 py-2 rounded hover:bg-blue-700'
              >
                Login
              </Link>
            </div>
          </div>

          {/* Second Row */}
          <div className='flex'>
            <div className='flex space-x-6 mt-2 items-center'>
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
                    <div className='absolute left-0 mt-4 bg-white border border-gray-300 font-medium text-sm rounded shadow-lg z-50 w-[500px] h-[400px]'>
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
              {[{ name: 'guides', label: 'Destination Guides' }].map(item => (
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
              ))}

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
     {/* Modal Form */}
     {isFormOpen && <CustomizeTripForm onClose={handleCloseForm} destination={''} />}
    </div>
  )
}

export default Navbar
