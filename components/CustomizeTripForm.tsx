'use client'
import React, { useState, useEffect } from 'react'
import { PiNotepadBold } from 'react-icons/pi'
import { FaArrowRightLong, FaUserCheck } from 'react-icons/fa6'
import { GrAchievement } from 'react-icons/gr'
import { FiPhoneCall } from 'react-icons/fi'
import { FaArrowCircleRight, FaMapMarkerAlt } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { db } from '../firebaseConfig' // Import Firestore instance
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

interface CustomizeTripFormProps {
  onClose: () => void
  destination: string // Add 'destination' to the props interface
}

const CustomizeTripForm: React.FC<CustomizeTripFormProps> = ({
  onClose,
  destination
}) => {
  const [step, setStep] = useState(1)
  const [dateOption, setDateOption] = useState<
    'fixed' | 'flexible' | 'anytime' | null
  >(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  // For flexible month selection
  const [numberOfDays, setNumberOfDays] = useState<number>(0) // For anytime option
  const [email, setEmail] = useState<string>('')
  const [contact, setContact] = useState<string>('')
  const [specialRequests, setSpecialRequests] = useState<string>('')
  const [from, setFrom] = useState<string>('') // State for "From" location
  const [to, setTo] = useState<string>(destination) // State for "To" location
  const [emailError, setEmailError] = useState<string>('')
  const [contactError, setContactError] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleOptionClick = (option: 'fixed' | 'flexible' | 'anytime') => {
    setDateOption(option)
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value)
    setSelectedDate(date)
  }

  const handleNextStep = () => {
    if (step === 2) {
      let isValid = true

      if (!email.includes('@')) {
        setEmailError('Please enter a valid email address.')
        isValid = false
      } else {
        setEmailError('')
      }

      if (!/^\d{10}$/.test(contact)) {
        setContactError('Please enter a valid 10-digit contact number.')
        isValid = false
      } else {
        setContactError('')
      }

      if (!isValid) return
    }

    setStep(prev => prev + 1)
  }
  const handlePreviousStep = () => setStep(prev => prev - 1)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)

    const formData = {
      from, // Adjust this field as needed
      to,
      departureDate: selectedDate?.toISOString() || 'Date flexible',
      departureMonth: selectedMonth || 'Not specified',
      departureYear: selectedYear || 'Not specified',
      numberOfDays,
      specialRequests: specialRequests || 'None',
      email: email,
      contactNo: contact,
      timestamp: serverTimestamp()
    }
    try {
      await addDoc(collection(db, 'custom_trips'), formData)

      const response = await fetch('/api/customize-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitted(true) // Show success message inside form
        setTimeout(() => {
          setSubmitted(false)
          onClose() // Close modal after short delay
        }, 2000)
        setFrom('')
        setTo(destination)
        setSelectedDate(null)
        setSelectedMonth('')
        setSelectedYear('')
        setNumberOfDays(0)
        setSpecialRequests('')
        setEmail('')
        setContact('')
      } else {
        alert('Failed to submit form. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 sm:p-6'>
      <div className='bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg flex flex-col md:flex-row relative'>
        {/* Left Section (Static Content) */}
        <button
          className='absolute top-2 right-3 bg-white  shadow-xl  text-gray-600 hover:text-black'
          onClick={onClose}
        >
          <MdClose size={24} />
        </button>
        <div className='w-full md:w-1/2 bg-blue-100 p-6 rounded-t-lg md:rounded-l-lg md:rounded-tr-none md:flex flex-col hidden'>
          <h2 className='text-lg sm:text-xl font-bold mb-4'>
            Customize Your Dream Trip
          </h2>

          <ol className='pl-6 mt-6 text-gray-700 font-semibold flex flex-col space-y-3 text-sm sm:text-base list-decimal'>
            <li>Tell us details of your holiday plan.</li>
            <li>
              Get multiple quotes from expert agents, compare & customize
              further.
            </li>
            <li>Select & book best deal.</li>
          </ol>

          <div className='flex items-center justify-center mt-6 space-x-6'>
            <PiNotepadBold size={40} />
            <FaUserCheck size={40} />
            <GrAchievement size={40} />
            {/* Adding explicit width and height to make the hr visible */}
          </div>
          <hr className='border-t-2 border-blue-500  mt-3' />
          <div className='flex flex-col items-center mt-2'>
            <p className='flex items-center font-semibold text-sm sm:text-base'>
              <span className='mr-2'>
                <FiPhoneCall />
              </span>{' '}
              Call us for details
            </p>
            <p className='text-2xl sm:text-3xl lg:text-4xl mt-3 font-bold text-blue-500'>
              +91 9953 786 506
            </p>
          </div>
        </div>

        {/* Right Section (Form Steps) */}
        <div className='w-full md:w-1/2 md:p-6 bg-white rounded-b-lg md:rounded-r-lg md:rounded-bl-none'>
          {step === 1 && (
            <form>
              <h2 className='text-lg md:text-xl font-bold mb-4'>
                Where do you want to go?
              </h2>
              <div className='mb-4'>
                <label className='block text-gray-700 mb-2'>To</label>
                <div className='relative'>
                  {/* Icon */}
                  <div className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400'>
                    <FaMapMarkerAlt size={18} />
                  </div>

                  {/* Input Field */}
                  <input
                    type='text'
                    className='w-full border border-gray-300 rounded px-3 py-2 pl-10 placeholder-gray-500 focus:outline-none'
                    placeholder='To'
                    value={to} // Bind the "To" field to the `to` state
                    onChange={e => setTo(e.target.value)}
                  />
                </div>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 mb-2'>From</label>
                <div className='relative'>
                  {/* Icon */}
                  <div className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400'>
                    <FaMapMarkerAlt size={18} />
                  </div>

                  {/* Input Field */}
                  <input
                    type='text'
                    className='w-full border border-gray-300 rounded px-3 py-2 pl-10 placeholder-gray-500 focus:outline-none'
                    placeholder='From'
                    value={from}
                    onChange={e => setFrom(e.target.value)}
                  />
                </div>
              </div>

              <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0  sm:space-x-4  mb-4 '>
                <button
                  type='button'
                  className={`w-full sm:w-1/3 px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600 ${
                    dateOption === 'fixed' ? 'bg-blue-700' : ''
                  }`}
                  onClick={() => handleOptionClick('fixed')}
                >
                  Fixed Date
                </button>
                <button
                  type='button'
                  className={`w-full sm:w-1/3 px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600 ${
                    dateOption === 'flexible' ? 'bg-blue-700' : ''
                  }`}
                  onClick={() => handleOptionClick('flexible')}
                >
                  Flexible
                </button>
                <button
                  type='button'
                  className={`w-full sm:w-1/3 px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600 ${
                    dateOption === 'anytime' ? 'bg-blue-700' : ''
                  }`}
                  onClick={() => handleOptionClick('anytime')}
                >
                  Anytime
                </button>
              </div>

              {dateOption === 'fixed' && (
                <div className='mb-4 flex space-x-4 w-full'>
                  {/* Departure Date Section */}
                  <div className='w-2/3'>
                    <label className='block text-gray-700 mb-2'>
                      Departure Date
                    </label>
                    <input
                      type='date'
                      className='w-full border border-gray-300 rounded px-3 py-2 text-base ' // Added `leading-6` for consistent text vertical alignment
                      onChange={handleDateChange}
                    />
                  </div>

                  {/* Days Section */}
                  <div className='w-1/3'>
                    <label className='block text-gray-700 mb-2'>Days</label>
                    <div className='flex items-center border-2 border-gray-500 rounded px-3 py-2 text-lg '>
                      {/* Decrement Button */}
                      <button
                        type='button'
                        className='text-gray-700 hover:text-gray-900 px-1 text-base font-bold'
                        onClick={() =>
                          setNumberOfDays(prev => Math.max(0, prev - 1))
                        }
                      >
                        -
                      </button>

                      {/* Days Input */}
                      <input
                        type='number'
                        className='w-full text-center border-none outline-none text-lg px-0 leading-6' // Added `leading-6` to match the font alignment
                        value={numberOfDays}
                        onChange={e =>
                          setNumberOfDays(parseInt(e.target.value, 10) || 0)
                        }
                      />

                      {/* Increment Button */}
                      <button
                        type='button'
                        className='text-gray-700 hover:text-gray-900 px-1 text-base font-bold'
                        onClick={() => setNumberOfDays(prev => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {dateOption === 'flexible' && (
                <div className='mb-4 flex items-end space-x-4 w-full'>
                  {/* Month and Year Selection */}
                  <div className='w-3/4'>
                    <label className='block text-gray-700 mb-2'>
                      Preferred Month
                    </label>
                    <div className='flex space-x-2'>
                      <select
                        className='w-2/3 border border-gray-300 rounded px-3 py-2 text-base'
                        onChange={e => setSelectedMonth(e.target.value)}
                      >
                        <option value=''>Select Month</option>
                        {[
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
                        ].map(month => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        className='w-1/3 border border-gray-300 rounded px-3 py-2 text-base'
                        onChange={e => setSelectedYear(e.target.value)}
                      >
                        <option value=''>Year</option>
                        {[...Array(5)].map((_, index) => {
                          const year = new Date().getFullYear() + index
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Number of Days */}
                  <div className='w-1/4'>
                    <label className='block text-gray-700 mb-2'>Days</label>
                    <div className='flex items-center border border-gray-300 rounded px-3 py-2 text-base'>
                      <button
                        type='button'
                        className='text-gray-700 hover:text-gray-900 px-1 text-base font-bold'
                        onClick={() =>
                          setNumberOfDays(prev => Math.max(0, prev - 1))
                        }
                      >
                        -
                      </button>
                      <input
                        type='number'
                        className='w-full text-center border-none outline-none text-base px-0'
                        value={numberOfDays}
                        onChange={e =>
                          setNumberOfDays(parseInt(e.target.value, 10) || 0)
                        }
                      />
                      <button
                        type='button'
                        className='text-gray-700 hover:text-gray-900 px-1 text-base font-bold'
                        onClick={() => setNumberOfDays(prev => prev + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* Anytime Section */}
              {dateOption === 'anytime' && (
                <div className='mb-4'>
                  <label className='block text-gray-700 mb-2'>
                    Number of Days
                  </label>
                  <div className='flex items-center border border-gray-300 rounded px-3 py-2'>
                    <button
                      type='button'
                      className='text-gray-700 hover:text-gray-900 px-1 text-base font-bold'
                      onClick={() =>
                        setNumberOfDays(prev => Math.max(0, prev - 1))
                      }
                    >
                      -
                    </button>
                    <input
                      type='number'
                      className='w-full text-center border-none outline-none text-lg px-0'
                      value={numberOfDays}
                      onChange={e =>
                        setNumberOfDays(parseInt(e.target.value, 10) || 0)
                      }
                    />
                    <button
                      type='button'
                      className='text-gray-700 hover:text-gray-900 px-1 text-base font-bold'
                      onClick={() => setNumberOfDays(prev => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <div className=' mt-6 w-full'>
                <button
                  type='button'
                  onClick={handleNextStep}
                  className='bg-blue-600 text-white px-4 py-2 w-full flex justify-center items-center rounded hover:bg-blue-700'
                >
                  Next
                  <span className='ml-2 '>
                    <FaArrowRightLong />
                  </span>
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form>
              <h2 className='text-xl font-bold mb-4'>Personal Information</h2>
              <div className='mb-4'>
                <label className='block text-gray-700 mb-2 font-semibold'>
                  Email Id:
                </label>
                <input
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full border ${
                    emailError ? 'border-red-500' : 'border-gray-300'
                  }  rounded px-3 py-2`}
                  placeholder='Enter your Email Id'
                  required
                />
                {emailError && (
                  <p className='text-red-500 text-sm mt-1'>{emailError}</p>
                )}
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 mb-2 font-semibold'>
                  Contact:
                </label>
                <input
                  type='number'
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  className={`w-full border ${
                    contactError ? 'border-red-500' : 'border-gray-300'
                  } rounded px-3 py-2`}
                  placeholder='Enter your Contact Number'
                  required
                />
                {contactError && (
                  <p className='text-red-500 text-sm mt-1'>{contactError}</p>
                )}
              </div>
              <div className='flex justify-between'>
                <button
                  type='button'
                  onClick={handlePreviousStep}
                  className='bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700'
                >
                  Back
                </button>
                <button
                  type='button'
                  onClick={handleNextStep}
                  className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                >
                  Next
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <h2 className='text-xl font-bold mb-4'>Additional Preferences</h2>
              <div className='mb-4'>
                <label className='block text-gray-700 mb-2'>
                  Special Requests
                </label>
                <textarea
                  onChange={e => setSpecialRequests(e.target.value)}
                  className='w-full border border-gray-300 rounded px-3 py-2'
                  rows={4}
                  placeholder='Enter any special requests or preferences'
                ></textarea>
              </div>
              <div className='flex justify-between'>
                <button
                  type='button'
                  onClick={handlePreviousStep}
                  className='bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700'
                >
                  Back
                </button>
                <button
                  type='submit'
                  disabled={submitting}
                  className={` py-2 px-4 rounded bg-blue-500 text-white ${
                    submitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-blue-600'
                  }`}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>

              {submitted && (
                <p className='mt-3 text-green-600 text-center text-blue-600'>
                  Form submitted successfully!
                </p>
              )}
            </form>
          )}
        </div>
        <div className='flex flex-col border-t-2 border-gray-300 pt-3 items-center mt-4 md:hidden '>
          <p className='flex items-center font-semibold text-sm sm:text-base'>
            <span className='mr-2'>
              <FiPhoneCall />
            </span>{' '}
            Call us for details
          </p>
          <p className='text-2xl sm:text-3xl lg:text-4xl mt-3 font-bold text-blue-500'>
            +91 9953 786 506
          </p>
        </div>
      </div>
    </div>
  )
}

export default CustomizeTripForm
