'use client'
import React, { useState } from 'react'
import { db } from "../firebaseConfig"; // Import Firestore instance
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import sibApiV3Sdk from "sib-api-v3-sdk";
import {
  FaPhoneAlt,
  FaAddressBook,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers
} from 'react-icons/fa'
import { IoMail } from 'react-icons/io5'
import { MdPhoneIphone } from 'react-icons/md'
interface FormData {
  name: string
  contactNo: string
  email: string
  query: string
  person: string
  destination: string
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contactNo: '',
    email: '',
    query: '',
    destination: '',
    person: ''
  })

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle input change event for each field
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  // Handle form submission

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Save form data to Firestore
      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
  
      // Call Next.js API route
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Email sending failed");
  
      setSuccess(true);
      setFormData({
        name: "",
        contactNo: "",
        email: "",
        query: "",
        destination: "",
        person: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="w-full mx-auto p-6 bg-gray-800 text-white shadow-lg">
      <h2 className="text-gray-400 text-lg uppercase mt-10 tracking-widest text-center">
        Contact
      </h2>
      <h4 className="text-white text-3xl font-bold tracking-wide text-center">
        Don't Think Just Ask
      </h4>
      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        {/* Left Section */}
        <div className="lg:w-1/3 md:flex hidden flex-col space-y-6 mt-4 items-center justify-center ">
          <h3 className="text-2xl font-semibold text-white">Get In Touch</h3>
          <div className="space-y-8 w-[70%] shadow-xl py-4 rounded-xl">
            <div className="flex flex-col items-center justify-center">
              <p className="text-base font-bold py-6 text-blue-500">For any queries:</p>
              <MdPhoneIphone className="text-blue-500 w-6 h-6" />
              <p className="text-gray-300">+91 1234567890</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <IoMail className="text-blue-500 w-6 h-6" />
              <p className="text-gray-300">sales@bhramansukh.in</p>
            </div>
            <div className="flex items-center flex-col">
              <FaAddressBook className="text-blue-500 w-6 h-6" />
              <p className="text-gray-300 w-[60%] mx-auto text-center">
                Aman Vihar, Haroon Nagar Sector 2, Phulwari Sharif, Patna
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/3 flex flex-col space-y-6 p-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <FaUser className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full py-2 pl-8 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none"
                placeholder="Name"
                required
              />
            </div>
            <div className="relative mb-4">
              <FaPhoneAlt className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <input
                type="number"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                className="w-full py-2 pl-8 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none"
                placeholder="Contact Number"
                required
              />
            </div>
            <div className="relative mb-4">
              <FaEnvelope className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2 pl-8 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                name="query"
                value={formData.query}
                onChange={handleChange}
                className="w-full py-2 bg-transparent border-b-2 border-gray-300 text-white focus:outline-none"
                rows={4}
                placeholder="Your Query"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-2 px-6 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-500 focus:outline-none"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
            {success && <p className="text-green-500 mt-3 text-center">Form submitted successfully!</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
