"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaPhoneAlt,
  FaUserPlus,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import logo from '../public/assets/logo.png'; // Logo placed in 'public/assets'

const Navbar: React.FC = () => {
  const [dropdowns, setDropdowns] = useState({
    honeymoon: false,
    family: false,
    holiday: false,
    hotels: false,
    guides: false,
    themes: false,
  });

  const toggleDropdown = (name: keyof typeof dropdowns) => {
    setDropdowns(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const hideDropdown = (name: keyof typeof dropdowns) => {
    setDropdowns(prev => ({
      ...prev,
      [name]: false,
    }));
  };

  return (
    <nav className="w-full text-white p-2 bg-black">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="text-2xl font-semibold">
          <Link href="/">
            
              <Image src={logo} alt="Logo" width={96} height={48} />
            
          </Link>
        </div>

        <div className="flex flex-col">
          {/* First Row */}
          <div className="flex justify-end">
            <div className="flex space-x-6 mb-2 text-xs">
              <a
                href="tel:+911234567890"
                className="hover:text-gray-400 flex items-center"
              >
                <FaPhoneAlt className="mr-2" />
                +91 1234567890
              </a>
              <button className="hover:text-gray-400 flex items-center">
                <FaUserPlus className="mr-2" />
                Travel Agent? Join Us
              </button>
              <Link href="/blogs" className="hover:text-gray-400 flex items-center">
                Blogs
              </Link>
              <Link href="/about" className="hover:text-gray-400 flex items-center">
                About Us
              </Link>
              <Link href="/login" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            
                  Login
                
              </Link>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex">
            <div className="flex space-x-6 mt-2 items-center">
              {[
                { name: 'honeymoon', label: 'Honeymoon Packages' },
                { name: 'family', label: 'Family Packages' },
                { name: 'holiday', label: 'Holiday Packages' },
              ].map(item => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseLeave={() => hideDropdown(item.name as keyof typeof dropdowns)}
                >
                  <a
                    href="#"
                    className="hover:text-gray-400 flex items-center"
                    onClick={e => {
                      e.preventDefault();
                      toggleDropdown(item.name as keyof typeof dropdowns);
                    }}
                  >
                    {item.label}
                    {dropdowns[item.name as keyof typeof dropdowns] ? (
                      <FaChevronUp className="ml-1" />
                    ) : (
                      <FaChevronDown className="ml-1" />
                    )}
                  </a>
                  {dropdowns[item.name as keyof typeof dropdowns] && (
                    <div className="absolute left-0 w-48 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                      <div className="p-2 hover:bg-gray-100 text-black">
                        Option 1
                      </div>
                      <div className="p-2 hover:bg-gray-100 text-black">
                        Option 2
                      </div>
                      <div className="p-2 hover:bg-gray-100 text-black">
                        Option 3
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Spacer */}
              <span className="mx-4 border-l border-gray-500 h-6"></span>
            </div>

            <div className="flex ml-6 space-x-6 mt-2 items-center">
              {[
                { name: 'hotels', label: 'Hotels' },
                { name: 'guides', label: 'Destination Guides' },
                { name: 'themes', label: 'Holiday Themes' },
              ].map(item => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseLeave={() => hideDropdown(item.name as keyof typeof dropdowns)}
                >
                  <a
                    href="#"
                    className="hover:text-gray-400 flex items-center"
                    onClick={e => {
                      e.preventDefault();
                      toggleDropdown(item.name as keyof typeof dropdowns);
                    }}
                  >
                    {item.label}
                    {dropdowns[item.name as keyof typeof dropdowns] ? (
                      <FaChevronUp className="ml-1" />
                    ) : (
                      <FaChevronDown className="ml-1" />
                    )}
                  </a>
                  {dropdowns[item.name as keyof typeof dropdowns] && (
                    <div className="absolute left-0 w-48 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                      <div className="p-2 hover:bg-gray-100 text-black">
                        Option 1
                      </div>
                      <div className="p-2 hover:bg-gray-100 text-black">
                        Option 2
                      </div>
                      <div className="p-2 hover:bg-gray-100 text-black">
                        Option 3
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Plan My Holiday */}
              <Link href="/plan-holiday" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
               
                  Plan My Holiday
                
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
