'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebaseConfig';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import Image from 'next/image';
import logo from '../public/assets/logo.png';
import Link from 'next/link';

interface LoginFormProps {
  onLoginSuccess?: () => void;
  hideBackground?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, hideBackground }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      router.push('/'); // Redirect to homepage
    } catch (error: any) {
      setError('Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative flex items-start   justify-center   ${hideBackground ? '' : 'py-20 min-h-screen bg-gray-900'}`}>
      {/* Background Image */}
      {!hideBackground && (
        <div
        className="absolute inset-0 bg-cover bg-center opacity-20 md:opacity-40"
        style={{
          backgroundImage: `url('/assets/login.jpg')`
        }}
      ></div>
      )}

      {/* Content */}
      <div className="relative flex flex-col items-center w-full max-w-md px-6 md:p-16 md:bg-white md:rounded-lg md:shadow-lg">
        
          <div className="p-2 mb-6 w-44">
            <Image src={logo} alt="Logo" priority/>
          </div>
          <form className="w-full" onSubmit={handleLogin}>
            <div className="relative mb-4">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600">
                <FaRegUser size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 className="w-full bg-transparent text-white md:text-blue-600 px-10 py-2 border border-white md:border-blue-500 rounded-full focus:outline-none placeholder:text-gray-300 md:placeholder:text-blue-200"
              placeholder="Enter your email"
              />
            </div>
            <div className="mb-4 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600">
                <RiLockPasswordLine size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 className="w-full bg-transparent text-white md:text-blue-600 px-10 py-2 border border-white md:border-blue-500 rounded-full focus:outline-none placeholder:text-gray-300 md:placeholder:text-blue-200"
              placeholder="Enter your password"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 uppercase tracking-wider font-bold"
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
            <p className="flex justify-center mt-4 text-white md:text-blue-500 text-sm italic">
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold underline ml-2">
                Sign up
              </Link>
            </p>
          </form>
        
      </div>
    </div>
  );
};

export default LoginForm;
