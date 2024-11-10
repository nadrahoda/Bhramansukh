"use client"
import React, { useState } from 'react';

interface FormData {
  name: string;
  contactNo: string;
  email: string;
  query: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contactNo: '',
    email: '',
    query: '',
  });

  // Handle input change event for each field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div className="w-full mx-auto p-6 bg-gray-900 text-white shadow-lg">
      <h2 className="text-gray-400 text-lg uppercase mt-10 tracking-widest text-center">Contact</h2>
      <h4 className="text-white text-3xl font-bold tracking-wide text-center">Don't Think Just Ask</h4>
      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        {/* Left Section: Company Details */}
        <div className="lg:w-1/3 flex flex-col space-y-6 mt-4 items-center justify-center">
          <h3 className="text-2xl font-semibold text-white">Get In Touch</h3>

          <p className="text-lg text-gray-300">For any queries, feel free to contact us:</p>

          <div className="space-y-4">
            <div className='flex flex-col items-center justify-center'>
              <h4 className="font-semibold text-lg text-gray-400">Phone:</h4>
              <p className="text-gray-300">+91 1234567890</p>
            </div>

            <div className='flex flex-col items-center justify-center'>
              <h4 className="font-semibold text-lg text-gray-400">Email:</h4>
              <p className="text-gray-300">sales@bhramansukh.in</p>
            </div>

            <div className="flex items-center flex-col">
              <h4 className="font-semibold text-lg text-gray-400">Address:</h4>
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
            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full py-2 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:ring-0"
                placeholder="Name"
                required
              />
            </div>

            {/* Contact No. Field */}
            <div className="mb-4">
              <input
                type="text"
                id="contactNo"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                className="w-full py-2 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:ring-0"
                placeholder="Contact Number"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none focus:ring-0"
                placeholder="Email Address"
                required
              />
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
