'use client'
import React, { useState } from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaPhoneVolume } from 'react-icons/fa6'
import { MdMail } from 'react-icons/md'
import { FaArrowRight } from 'react-icons/fa'
import Image from 'next/image'
import logo from '../public/assets/logo.png'
import { db } from '@/firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setStatus('Please enter a valid email.')
      return
    }

    try {
      await addDoc(collection(db, 'newsletterSubscriptions'), {
        email: email,
        timestamp: serverTimestamp()
      })
      setStatus('Subscribed successfully!')
      setEmail('') // Clear input field
    } catch (error) {
      setStatus('Subscription failed. Try again.')
      console.error('Error adding email: ', error)
    }
  }

  return (
    <footer className='bg-gray-900 text-gray-300 py-12'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Grid Container */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* 1️⃣ Logo & About */}
          <div>
            <Image
              src={logo}
              alt='Logo'
              width={150}
              height={75}
              className='mb-3'
            />
            <p className='text-sm text-gray-400'>
              Explore the world with us and create unforgettable travel
              experiences.
            </p>
          </div>

          {/* 2️⃣ Contact Information */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-4'>
              Contact Us
            </h4>
            <p className='flex items-center text-sm mb-2'>
              <FaPhoneVolume className='mr-2 mt-1 text-blue-500' /> +91 9953 786 506
            </p>
            <p className='flex items-center text-sm'>
              <MdMail className='mr-2 mt-1 text-blue-500' /> sales@bhramansukh.in
            </p>
          </div>

          {/* 3️⃣ Quick Links */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-4'>
              Quick Links
            </h4>
            <ul className='space-y-2 text-sm'>
              <li className='hover:text-blue-400 transition'>
                <a href='/'>Home</a>
              </li>
              <li className='hover:text-blue-400 transition'>
                <a href='/about'>About Us</a>
              </li>
            </ul>
          </div>

          {/* 4️⃣ Newsletter & Social Links */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-4'>
              Newsletter
            </h4>
            <div className='flex items-center border border-gray-500 rounded-lg overflow-hidden'>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full px-4 py-2 bg-gray-800 text-white text-sm focus:outline-none'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button
                onClick={handleSubscribe}
                className='bg-blue-600 px-4 py-2'
              >
                <FaArrowRight className='text-white' />
              </button>
            </div>
            {/* Subscription Status Message */}
            {status && <p className='text-sm mt-2 text-blue-400'>{status}</p>}
            {/* Social Icons */}
            <div className='flex space-x-4 mt-4 text-lg'>
              <a
                href='https://www.facebook.com/people/Bhramansukh-Tour-and-Travels/61554540670580/'
                target='_blank'
              >
                <FaFacebook className='cursor-pointer hover:text-blue-500 transition' />
              </a>
              <a href='https://x.com/BhramanSukh' target='_blank'>
                {' '}
                <FaTwitter className='cursor-pointer hover:text-blue-400 transition' />
              </a>
              <a href='https://www.instagram.com/bhramansukh/' target='_blank'>
                {' '}
                <FaInstagram className='cursor-pointer hover:text-pink-500 transition' />
              </a>
              <a
                href='https://www.linkedin.com/company/bhramansukh/posts/?feedView=all'
                target='_blank'
              >
                <FaLinkedin className='cursor-pointer hover:text-blue-700 transition' />{' '}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 border-t border-gray-700 pt-4'>
          <p>© 2025 Travel Company. All Rights Reserved.</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
