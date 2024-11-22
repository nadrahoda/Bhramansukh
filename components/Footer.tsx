import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import logo from '../public/assets/logo.png';
import { FaPhone } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* First Column - Logo and Social Icons */}
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Image src={logo} alt="Logo" className="w-28" />
          </div>
          <div className="flex space-x-4 items-center justify-center pl-2">
            <a href="/" className="text-xl">
              <FaFacebook />
            </a>
            <a href="/" className="text-xl">
              <FaTwitter />
            </a>
            <a href="/" className="text-xl">
              <FaInstagram />
            </a>
            <a href="/" className="text-xl">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Second Column - Company Links */}
        <div className="flex flex-col space-y-3  items-center">
          <h4 className="text-xl font-semibold">Company</h4>
          <a href="/" className="text-gray-400 hover:text-white">
            About Us
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            Contact Us
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            Our Blogs
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            Career With Us
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            Payment Policy
          </a>
        </div>

        {/* Third Column - Group Tours */}
        <div className="flex flex-col space-y-3  items-center">
          <h4 className="text-xl font-semibold">Group Tours</h4>
          <a href="/" className="text-gray-400 hover:text-white">
            Trekking
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            Biking Trips
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            Upcoming Trips
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            Backpacking Trips
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            Weekend Getaways
          </a>
        </div>

        {/* Fourth Column - Customized Trips */}
        <div className="flex flex-col space-y-3 items-center ">
          <h4 className="text-xl font-semibold">Customized Trips</h4>
          <a href="/" className="text-gray-400 hover:text-white">
            Corporate Tours
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            Domestic Tours
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            International Getaways
          </a>
        </div>

        {/* Fifth Column - Contact Us */}
        <div className="flex flex-col space-y-3 items-center ">
          <h4 className="text-xl font-semibold">Contact Us</h4>
         
          <p className="text-gray-400">+91 9953786506</p>
          <p className="text-gray-400">sales@bhramansukh.in</p>
          <p className="text-gray-400 text-center">
            Aman Vihar, Haroon Nagar Sector 2, Phulwari Sharif, Patna
          </p>
        </div>
      </div>

      <div className="text-center mt-8 text-white py-1 bg-blue-500">
        <p>&copy; 2024 Bhramansukh. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
