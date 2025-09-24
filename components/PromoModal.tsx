import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import banner from '../public/assets/Dandiya_Web.png'
import bannermob from '../public/assets/Dandiya_Mob.png'
import { AiOutlineClose } from 'react-icons/ai'
import { FiPhone } from 'react-icons/fi'

interface PromoModalProps {
  onClose: () => void
}

const PromoModal: React.FC<PromoModalProps> = ({ onClose }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize() // initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose(); // Auto close after 10 seconds
      }, 5000);

      return () => clearTimeout(timer); // cleanup
    }, [onClose]);

    if (!mounted) return null // prevent flicker on server
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2'>
      <div className='relative bg-black p-2 rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-1 right-1 bg-blue-200 rounded-full p-1 hover:bg-gray-300 text-gray-700'
        >
          <AiOutlineClose size={16} />
        </button>

        {/* Promo Banner Image */}
        <Image
          src={isMobile ? bannermob : banner}
          alt='Promo Banner'
          width={isMobile ? 600 : 1200}
          height={isMobile ? 800 : 800}
          className='w-full h-auto object-cover'
          priority
        />

        <div className='flex items-center justify-center w-full p-2'>
          <a
            href='tel:9953786506'
            className='bg-blue-500 w-full rounded-lg my-2 p-2 text-white text-base font-semibold flex items-center justify-center space-x-2'
          >
            <FiPhone size={20} />
            <span>Reach out to us for more details</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default PromoModal
