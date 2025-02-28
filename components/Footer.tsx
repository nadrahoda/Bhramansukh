import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import Image from 'next/image'
import logo from '../public/assets/logo.png'
import { FaPhone } from 'react-icons/fa6'
import { FaPhoneVolume } from "react-icons/fa6";
import { MdMail } from "react-icons/md";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
    {/* Main Links Section */}
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0">
        {/* Links */}
        <div className="flex flex-col justify-between w-full md:w-2/3 space-y-4">
          <div className="flex flex-wrap space-x-4 text-sm">
            <p className="font-semibold">About Us</p>
            <p className="font-semibold">Team</p>
            <p className="font-semibold">We're Hiring</p>
            <p className="font-semibold">Testimonial</p>
            <p className="font-semibold">Blog</p>
            <p className="font-semibold">Travelogues</p>
            <p className="font-semibold">Terms & Conditions</p>
            <p className="font-semibold">Privacy Policy</p>
          </div>

          <div className="flex space-x-8 text-sm">
            <p className="font-semibold">Travel Agent? Join Us</p>
            <p className="font-semibold">FAQ</p>
            <p className="font-semibold">Contact Us</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-left flex flex-col space-y-2 items-start">
          <p className="font-semibold flex items-center">
            <FaPhoneVolume className="mr-3" /> Contact: +1-234-567-890
          </p>
          <p className="font-semibold flex items-center">
            <MdMail className="mr-3" /> info@travelcompany.com
          </p>
        </div>
      </div>
    </div>

   

    {/* Three Columns - First Section */}
    <div className="max-w-7xl mx-auto mt-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h4 className="text-xl font-semibold text-white mb-2">Corporate Office:</h4>
        <p className="text-sm w-2/3">
          Aman Vihar, Haroon Nagar Sector-2, Phulwari Sharif, Patna 801505
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white mb-2">Connect with us on:</h4>
        <div className="text-sm flex space-x-5 pl-2">
          <FaFacebook size={20} />
          <FaTwitter size={20} />
          <FaInstagram size={20} />
          <FaLinkedin size={20} />
        </div>
      </div>
    </div>

    {/* Three Columns - Second Section */}
    <div className="max-w-7xl mx-auto mt-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <div className="w-1/3">
        <Image src={logo} alt="Logo" width={192} height={96} className="w-36 pl-2" />
      </div>
      <div className="w-1/3 text-nowrap">
        <h4 className="text-lg text-center font-semibold text-white mb-2">
          Made with ❤️ in India
        </h4>
      </div>
      <div className="w-1/3 text-right text-nowrap">
        <p className="text-sm">All rights reserved © 2024</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer
