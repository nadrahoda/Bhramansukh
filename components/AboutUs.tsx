import React from 'react'
import Image from "next/image";
import banner from '../public/assets/banner.jpg'
const AboutUs = () => {
  return (
    <div className="bg-gray-900 text-white">
    {/* Hero Section */}
    <div className="relative h-[300px] w-full">
      {/* Background Image */}
      <Image
        src={banner}
        alt="About Us Background"
        layout="fill"
        objectFit="cover"
        priority={true}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Heading */}
      <div className="relative flex items-center justify-center h-full">
        <h1 className="text-white text-6xl font-bold capitalize tracking-wider">
          About Us
        </h1>
      </div>
    </div>

    {/* Content Section */}
    <div className="py-12 px-6 lg:px-20">
      {/* Our Goal Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold mb-6 border-b-2 border-blue-500 inline-block">
          Our Goal
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Bhramansukh Tour and Travels - Bask in Nature’s Lap
        </p>
        <p className="text-lg text-gray-300 leading-relaxed mt-4">
          Discover the world with Bhramansukh Tour and Travels, your trusted
          travel companion since 2015. Over the past decade, we have
          redefined the art of travel by creating unique, unforgettable
          experiences for over 2,500+ satisfied customers. Whether it’s an
          adventurous getaway, a tranquil nature retreat, or a culturally
          enriching journey, our customized travel packages and group tours
          cater to every traveler’s desires.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed mt-4">
          We specialize in crafting journeys that go beyond the ordinary,
          blending culture, adventure, and luxury while promoting sustainable
          and responsible tourism. With a diverse range of offerings, from
          adrenaline-filled adventures to soul-soothing wellness escapes, we
          ensure every step of your journey is a memory to cherish.
        </p>
      </section>

      {/* Our Vision Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold mb-6 border-b-2 border-blue-500 inline-block">
          Our Vision
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          To inspire and connect people through transformative travel
          experiences while fostering a deep appreciation for nature, culture,
          and diversity. We aim to promote responsible tourism that
          contributes to the well-being of local communities and the
          environment.
        </p>
      </section>

      {/* Our Mission Section */}
      <section>
        <h2 className="text-4xl font-bold mb-6 border-b-2 border-blue-500 inline-block">
          Our Mission
        </h2>
        <ul className="list-disc pl-8 text-lg text-gray-300 leading-relaxed space-y-4">
          <li>
            <strong>To Craft Unforgettable Journeys:</strong> Offer
            personalized, value-packed travel packages that cater to every
            taste, from solo trips to family vacations.
          </li>
          <li>
            <strong>To Unite People Through Travel:</strong> Create meaningful
            connections by bringing travelers together through unique group
            experiences like Strangers Unite and Therapy Travels.
          </li>
          <li>
            <strong>To Promote Sustainability:</strong> Focus on eco-friendly
            tourism that respects local traditions and preserves natural
            beauty.
          </li>
          <li>
            <strong>To Cater to Every Travel Style:</strong> Provide tailored
            experiences for adventure seekers, nature lovers, cultural
            explorers, and more.
          </li>
        </ul>
      </section>
    </div>
  </div>
 
  )
}

export default AboutUs
