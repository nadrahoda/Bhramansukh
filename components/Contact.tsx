'use client'
import React, { useState } from 'react'
import { db } from '../firebaseConfig' // Import Firestore instance
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

import {
  FaPhoneAlt,
  FaUser,
  FaEnvelope,
  FaCheckCircle,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter
} from 'react-icons/fa'


import { IoMail } from 'react-icons/io5'
import { MdPhoneIphone } from 'react-icons/md'

interface FormData {
  firstName: string
  lastName:string
  contactNo: string
  email: string
  query: string
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    contactNo: '',
    email: '',
    query: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Handle input change event for each field
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submission

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Save form data to Firestore
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        timestamp: serverTimestamp()
      })

      // Call Next.js API route
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      // const data = await res.json();
      if (!res.ok) throw new Error('Email sending failed')

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
      setFormData({
        firstName: '',
        lastName: '',
        contactNo: '',
        email: '',
        query: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full mx-auto p-6 py-10 bg-gray-800 text-white shadow-lg'>
      <h2 className='text-gray-400 text-lg uppercase tracking-widest text-center'>
        Contact
      </h2>
      <h4 className='text-white text-3xl font-bold tracking-wide text-center'>
        Don't Think Just Ask
      </h4>
      <div className='flex flex-col lg:flex-row gap-8 mt-6'>
        {/* Left Section */}
        <div className='lg:w-1/2 md:flex hidden flex-col space-y-6 mt-4 items-center justify-center'>
          <div className='bg-gradient-to-r from-blue-900 to-blue-500 px-8 py-12 flex flex-col space-y-8 rounded-xl text-white shadow-xl w-[60%]'>
            <h3 className='text-xl font-semibold'>Get In Touch</h3>

            <div className='flex flex-col '>
              <h3 className='font-semibold text-base pb-1'>Visit us</h3>
              <p className='text-sm'>Come say hello at our office HQ.</p>
              <p className='text-sm font-semibold italic'>
                Aman Vihar, Haroon Nagar Sector-2, Phulwari Sharif, Patna 801505
              </p>
            </div>
            <div className='flex flex-col '>
              <h3 className='font-semibold text-base pb-1'>Chat to us</h3>
              <p className='text-sm'>Our friendly team is here to help.</p>
              <p className='text-sm font-semibold italic'>
                sales@bhramansukh.in
              </p>
            </div>
            <div className='flex flex-col '>
              <h3 className='font-semibold text-base pb-1'>Call us</h3>
              <p className='text-sm'>Mon-Sat from 8am to 5pm</p>
              <p className='text-sm font-semibold italic'>(+91) 9953 786 506</p>
            </div>
            {/* Social Media Icons */}
            <div className='flex  flex-col'>
              <div className='flex'>
                <h3 className='font-semibold text-base pb-3'>Social Media</h3>
              </div>
              <div className='flex space-x-2'>
                <a
                  href='https://www.facebook.com/people/Bhramansukh-Tour-and-Travels/61554540670580/'
                  className='hover:text-gray-300 transition duration-300'
                  target='_blank'
                >
                  <span className='text-white w-6 h-6'>
                  <FaFacebook />
                  </span>
                
                </a>
                <a
                  href='https://www.instagram.com/bhramansukh/'
                  className='hover:text-gray-300 transition duration-300'
                  target='_blank'
                >
                  <span className='text-white w-6 h-6'>
                  <FaInstagram  />
                  </span>
                 
                </a>
                <a
                  href='https://www.linkedin.com/company/bhramansukh/posts/?feedView=all'
                  className='hover:text-gray-300 transition duration-300'
                  target='_blank'
                ><span className='text-white w-6 h-6'>
  <FaLinkedinIn  />
                </span>
                
                </a>
                <a
                  href='https://x.com/BhramanSukh'
                  className='hover:text-gray-300 transition duration-300'
                  target='_blank'
                >
                  <span className='text-white w-6 h-6'>  <FaTwitter  /></span>
                
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className='lg:w-1/2 flex flex-col items-center justify-center space-y-6 p-6 mx-auto'>
          <form onSubmit={handleSubmit} className='space-y-4 w-[80%]'>
            <div className='flex gap-4'>
              <div className='w-1/2'>
              <label className="text-sm">First Name</label>
            <div className='relative mt-1'>
              <span className='absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5'>
              <FaUser  />
              </span>
             
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                className='w-full py-2 pl-10 bg-transparent border border-white rounded-md text-white focus:outline-none placeholder-gray-300 border-opacity-50'
                placeholder='First Name'
                required
              />
            </div>
            </div>
            <div className="w-1/2">
                <label className="text-sm">Last Name</label>
                <div className="relative mt-1">
                  <span className='absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5'>
                  <FaUser />
                  </span>
                 
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full py-2 pl-10 bg-transparent border border-white rounded-md text-white focus:outline-none placeholder-gray-300 border-opacity-50"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              </div>
          {/* Email */}
          <div>
              <label className="text-sm">Email Address</label>
              <div className="relative mt-1">
                <span className='absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5'>
                <FaEnvelope  />
                </span>
               
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-2 pl-10 bg-transparent border border-white rounded-md text-white focus:outline-none placeholder-gray-300 border-opacity-50"
                  placeholder="Email Address"
                  required
                />
              </div>
            </div>
            {/* Contact Number */}
            <div>
              <label className="text-sm">Contact Number</label>
              <div className="relative mt-1">
                <span className='absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5'>
                <FaPhoneAlt  />
                </span>
              
                <input
                  type="number"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  className="w-full py-2 pl-10 bg-transparent border border-white rounded-md text-white focus:outline-none placeholder-gray-300 border-opacity-50"
                  placeholder="Contact Number"
                  required
                />
              </div>
            </div>
            {/* Message */}
            <div>
              <label className="text-sm">Your Query</label>
              <textarea
                name="query"
                value={formData.query}
                onChange={handleChange}
                className="w-full py-2 px-2 bg-transparent border border-white rounded-md text-white focus:outline-none placeholder-gray-300 border-opacity-50"
                rows={4}
                placeholder="Write your message here..."
                required
              />
            </div>

           {/* Submit Button */}
           <div className="text-center">
              <button
                type="submit"
                className="w-full py-2 px-6 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-500 focus:outline-none"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {success && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-10 rounded-xl flex items-center flex-col shadow-xl text-center'>
            <span className='text-blue-500  mx-auto'>  
                <FaCheckCircle  size={40}/></span>
        
            <p className='text-gray-800 text-lg font-semibold mt-2'>
              Your journey begins here! 🌍✈️
            </p>
            <p className='text-gray-600 text-sm mt-1'>
              We've received your query and will get back to you soon. Get ready
              to explore!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact
