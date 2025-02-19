'use client'

import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebaseConfig'
import { FaRegUser } from 'react-icons/fa'
import { RiLockPasswordLine } from 'react-icons/ri'
import logo from '../../public/assets/logo.png'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/') // Redirect to homepage
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className='relative flex h-screen items-center justify-center bg-gray-900'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center opacity-40'
        style={{
          backgroundImage: `url('/assets/login.jpg')` // Replace with your image path
        }}
      ></div>

      {/* Content */}
      <div className='relative w-full max-w-md p-8 bg-white  rounded-lg shadow-lg'>
        <div className='flex flex-col items-center'>
          <div className=' p-2 mb-6 w-44'>
            <Image src={logo} alt='Logo' />
          </div>
          {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
          <form className='w-full' onSubmit={handleLogin}>
            <div className='relative mb-4'>
              <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600'>
                <FaRegUser size={18} />
              </div>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='w-full bg-transparent text-blue-600 px-10 py-2 border border-blue-500 rounded-full focus:outline-none placeholder:text-blue-200'
                placeholder='Enter your email'
              />
            </div>
            <div className='mb-4 relative'>
              <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600'>
                <RiLockPasswordLine size={18} />
              </div>
              <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full px-10 bg-transparent text-blue-600 py-2 border border-blue-500 rounded-full focus:outline-none placeholder:text-blue-200'
                placeholder='Enter your password'
              />
            </div>
            {error && <p>{error}</p>}
            <button
              type='submit'
              className='w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 uppercase tracking-wider font-bold'
            >
              Login
            </button>
            <p className='flex justify-center mt-4 text-blue-500 text-sm italic '>
              Don't have an account?{' '}
              <Link href='/signup' className='font-semibold underline ml-2'>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
