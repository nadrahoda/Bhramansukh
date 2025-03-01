'use client'

import React, { useCallback, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { RiLockPasswordLine } from 'react-icons/ri'
import { IoIosPhonePortrait } from 'react-icons/io' // Icon for phone number
import { CiMail } from 'react-icons/ci'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/firebaseConfig'

interface SignupProps{
  onSignupSuccess?:()=> void;
  hideBackground?:boolean;
}

const Signup: React.FC<SignupProps> = ({onSignupSuccess, hideBackground}) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true);
    setError('')

    // Get form values
    const fullName = `${firstName} ${lastName}`.trim()

    if (!email || !contactNo) {
      setError('Email and phone number are required.')
      return
    }

    const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = await import('firebase/auth');

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        contactNo,
        email,
        uid: user.uid
      })

      await signInWithEmailAndPassword(auth, email, password)

      onSignupSuccess?.();
      router.push('/') // Redirect to login after successful signup
    } catch (error: any) {
      setError(error.message)
    }finally{
      setLoading(false)
    }
  }

  const handleInputChange = useCallback((setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value), []);

  
  return (
    <div className={`relative flex items-center justify-center ${hideBackground ? '' : 'h-screen bg-gray-900'}  `}>
      {/* Background Image */}
      {!hideBackground && (
  <div
  className='absolute inset-0 bg-cover bg-center opacity-40'
  style={{
    backgroundImage: `url('/assets/login.jpg')`, // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    
  }}
></div>
      )}
    

      {/* Content */}
      <div className='relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <div className='flex flex-col items-center'>
          <div className='p-2 mb-6 w-28'>
          <Image src="/assets/logo.png" alt="Logo" width={176} height={50} priority />
          </div>
          {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
          <form className='w-full' onSubmit={handleSignup}>
            {/* First Name & Last Name */}
            <div className='flex space-x-4 mb-4'>
              <div className='relative w-1/2'>
                <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600'>
                  <FaRegUser size={18} />
                </div>
                <input
                  type='text'
                  value={firstName}
                  onChange={handleInputChange(setFirstName)}
                  className='w-full bg-transparent text-blue-600 px-10 py-2 border border-blue-500 rounded-full focus:outline-none placeholder:text-blue-200'
                  placeholder='First Name'
                />
              </div>
              <div className='relative w-1/2'>
                <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600'>
                  <FaRegUser size={18} />
                </div>
                <input
                  type='text'
                  value={lastName}
                  onChange={handleInputChange(setLastName)}
                  className='w-full bg-transparent text-blue-600 px-10 py-2 border border-blue-500 rounded-full focus:outline-none placeholder:text-blue-200'
                  placeholder='Last Name'
                />
              </div>
            </div>

            {/* Contact Number */}
            <div className='relative mb-4'>
              <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600'>
                <IoIosPhonePortrait size={18} />
              </div>
              <input
                type='tel'
                value={contactNo}
                onChange={handleInputChange(setContactNo)}
                className='w-full bg-transparent text-blue-600 px-10 py-2 border border-blue-500 rounded-full focus:outline-none placeholder:text-blue-200'
                placeholder='Contact Number'
                required
              />
            </div>

            {/* Email Address */}
            <div className='relative mb-4'>
              <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600'>
                <CiMail size={18} />
              </div>
              <input
                type='email'
                value={email}
                onChange={handleInputChange(setEmail)}
                id='email'
                className='w-full bg-transparent text-blue-600 px-10 py-2 border border-blue-500 rounded-full focus:outline-none placeholder:text-blue-200'
                placeholder='Enter your email'
                required
              />
            </div>

            {/* Password */}
            <div className='relative mb-4'>
              <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600'>
                <RiLockPasswordLine size={18} />
              </div>
              <input
                type='password'
                value={password}
                onChange={handleInputChange(setPassword)}
                id='password'
                className='w-full px-10 bg-transparent text-blue-600 py-2 border border-blue-500 rounded-full focus:outline-none placeholder:text-blue-200'
                placeholder='Enter your password'
                required
              />
            </div>

            {/* Sign Up Button */}
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 uppercase tracking-wider font-bold' disabled={loading}
            >
              {loading ? 'Signing up...': 'Sign Up'}
            </button>

            <p className='flex justify-center text-blue-500 text-sm italic mt-4'>
              Already have an account?{' '}
              <Link href='/login' className='underline ml-2 font-bold'>
                Log In{' '}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Signup