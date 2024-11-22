"use client"
import React, { useState } from 'react';
import { FaPhoneAlt, FaAddressBook, FaUser, FaEnvelope, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdPhoneIphone } from "react-icons/md";
interface FormData {
  name: string;
  contactNo: string;
  email: string;
  query: string;
  person: string;
  destination: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contactNo: '',
    email: '',
    query: '',
    destination: '',
    person:'',
  });

  // Handle input change event for each field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to a server
    console.log('Form submitted', formData);
  };



  return (
    <div className="w-full mx-auto p-6 bg-gray-800 text-white shadow-lg">
      <h2 className="text-gray-400 text-lg uppercase mt-10 tracking-widest text-center">Contact</h2>
      <h4 className="text-white text-3xl font-bold tracking-wide text-center">Don't Think Just Ask</h4>
      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        {/* Left Section: Company Details */}
        <div className="lg:w-1/3 flex flex-col space-y-6 mt-4 items-center justify-center">
          <h3 className="text-2xl font-semibold text-white">Get In Touch</h3>

          <p className="text-lg text-gray-300">For any queries, feel free to contact us:</p>

          <div className="space-y-8 w-[70%] shadow-xl py-4 rounded-xl">
            <div className='flex flex-col items-center justify-center'>
              <h4 className="font-semibold text-lg text-gray-400"><MdPhoneIphone/></h4>
              <p className="text-gray-300">+91 1234567890</p>
            </div>

            <div className='flex flex-col items-center justify-center'>
              <h4 className="font-semibold text-lg text-gray-400"><IoMail/></h4>
              <p className="text-gray-300">sales@bhramansukh.in</p>
            </div>

            <div className="flex items-center flex-col">
              <h4 className="font-semibold text-lg text-gray-400"><FaAddressBook/></h4>
              <p className="text-gray-300 w-[60%] mx-auto text-center">
                Aman Vihar, Haroon Nagar Sector 2, Phulwari Sharif, Patna
              </p>
            </div>
          </div>
        </div>
        {/* Divider Line */}
        <div className="hidden lg:block w-px bg-gray-600 mx-8"></div>
        {/* Right Section: Contact Form */}
        <div className="lg:w-1/3 flex flex-col space-y-6 p-6 mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Name Field (Combined First Name and Last Name in the same box) */}
            <div className="relative mb-4">
          <FaUser className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full py-2 pl-8 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:ring-0 placeholder-gray-500"
            placeholder="Name"
            required
          />
        </div>
            {/* Contact No. Field */}
            <div className="relative mb-4">
          <FaPhoneAlt className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
          <input
            type="number"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            className="w-full py-2 pl-8 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:ring-0 placeholder-gray-500"
            placeholder="Contact Number"
            required
          />
        </div>

        {/* Email Field */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full py-2 pl-8 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:ring-0 placeholder-gray-500"
            placeholder="Email Address"
            required
          />
        </div>

        {/* Destination Field */}
        <div className="relative mb-4">
          <FaMapMarkerAlt className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full py-2 pl-8 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:ring-0 placeholder-gray-500"
            placeholder="Enter the Destination"
            required
          />
        </div>

        {/* No. of Persons Field */}
        <div className="relative mb-4">
          <FaUsers className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
          <select
            name="person"
            value={formData.person}
            onChange={handleChange}
            className="w-full py-2 pl-8 bg-transparent border-b-2 border-gray-300 text-gray-400 focus:outline-none focus:ring-0"
            required
          >
            <option value="" className="text-gray-500">
              Select Number of Persons
            </option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num} className="text-black">
                {num}
              </option>
            ))}
          </select>
        </div>


            {/* Query Text Box */}
            <div className="mb-4">
              <textarea
                id="query"
                name="query"
                value={formData.query}
                onChange={handleChange}
                className="w-full py-2 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:ring-0"
                rows={4}
                placeholder="Your Query"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-2 px-6 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
