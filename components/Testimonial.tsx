// app/components/Testimonial.tsx
"use client";
import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RiDoubleQuotesL } from 'react-icons/ri';
import Image, { StaticImageData } from 'next/image';
import profile from '../public/assets/profile.jpg'
import review1 from '../public/assets/farah.jpg'
import review2 from '../public/assets/raza.png'
import review3 from '../public/assets/kamran.png'
import review4 from '../public/assets/sam.png'
import review5 from '../public/assets/anisha.png'
import review6 from '../public/assets/shomail.jpg'
import review7 from '../public/assets/farheen.png'

// Define types for the testimonial data
interface TestimonialData {
  id: number;
  name: string;
  image: string | StaticImageData; // Image path will be string (e.g., '/assets/profile.jpg')
  content: string;
}

const testimonialsData: TestimonialData[] = [
    {
        id: 1,
        name: 'Farah Rizwan',
        image: review1,
        content: 'We had an amazing and safe experience in Uttarakhand with Bhramansukh Tours & Travels! The 3D/2N stay (Jan 25-28, 2024) was perfectly organized. The owner was extremely kind and knowledgeable, providing customized itineraries for all types of groups-family, friends, or couples. Highly recommended for a seamless travel experience! 😊'
      },
      {
        id: 2,
        name: 'Raza Karim',
        image: review2,
        content: 'I recently had an amazing trip with Bhramansukh Tour & Travels. From seamless planning to strategically located accommodations and a well-curated itinerary, every detail was perfection. The exceptional customer service, knowledgeable guides, and impeccable transportation made it a stress-free and enjoyable journey. Highly recommend Bhramansukh for a hassle-free and unforgettable travel experience!'
      },
      {
        id: 3,
        name: 'Kamran Akhtar',
        image: review3,
        content:
          'Fantastic customer service from Bhramansukh Tour & Travels .They made everything easy with prompt efficient follow up to our requests, all bookings completed smoothly - from Flights to accommodation and travel/ transfers etc. All went smoothly and without a hitch, meaning we could relax and enjoy our holiday! I will highly recommend you book through Bhramansukh.'
      },
      {
        id: 4,
        name: 'Sam Haq',
        image: review4,
        content:
          'Exceptional service! From booking to the actual tour, every aspect was seamless. The team at Bhramansukh Tour & Travels ensured our trip was unforgettable. Knowledgeable guides, comfortable accommodations, and well-planned itineraries made our experience truly memorable. Highly recommend them for your next adventure!'
      },
      {
        id: 5,
        name: 'Anisha Singh',
        image: review5,
        content:
          'Thank you so much, Bhramansukh, for organizing an amazing, memorable, adventurous, and truly enjoyable trip. This experience will forever be one of my best, filled with unforgettable memories. We all started as strangers, but returned as friends, like family—brothers, sisters, and best friends. I hope for many more trips like this in the future.'
      },
      {
        id: 6,
        name: 'Shomail Akhter',
        image: review6,
        content: 'I booked a package through Bhramansukh and it turned out to be a great success. From the airport pick up till the airport drop off and everything at the destination was very smooth and well managed. I would really like to appreciate and thank Bhramansukh for their support and coordination throughout the trip. They were very professional and were constantly in touch with us making sure our trip goes smoothly.'
      },
      {
        id: 7,
        name: 'Farheen Hassan',
        image: review7,
        content: 'I had so many trips from Bhramansukh and each trip was amazing.They personally make sure all the arrangements are perfect. I highly recommend Bhramansukh for your next trip.'
      },
      {
        id: 8,
        name: 'Jane Smith',
        image: profile,
        content: 'Amazing experience! I enjoyed every moment of the trip.'
      },
      {
        id: 9,
        name: 'Samuel Lee',
        image: profile,
        content:
          'The best vacation I have ever had. Great service and beautiful locations.'
      },
      {
        id: 10,
        name: 'Emma Watson',
        image: profile,
        content:
          'Absolutely fantastic! Will definitely book again for my next holiday.'
      },
      {
        id: 11,
        name: 'Chris Pratt',
        image: profile,
        content:
          'An unforgettable adventure. Highly professional team and stunning destinations.'
      },
      {
        id: 12,
        name: 'Olivia Brown',
        image: profile,
        content: 'A wonderful experience from start to finish. Truly unforgettable!'
      }
];

const Testimonial: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const testimonialsToShow = 3; // Number of testimonials to show at a time
  const maxIndex = testimonialsData.length - testimonialsToShow; // Maximum index for the last set of testimonials

  // Move to the next set of testimonials
  const goToNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prevIndex) => prevIndex + testimonialsToShow); // Move by 3 testimonials at a time
    }
  };

  // Move to the previous set of testimonials
  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - testimonialsToShow); // Move by 3 testimonials at a time
    }
  };

  return (
    <div className="bg-gray-800 py-10">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-gray-400 text-lg uppercase flex tracking-widest">REVIEWS</h3>
        <h1 className="text-white text-4xl font-semibold flex tracking-wide">What Our Clients Say About Us</h1>
      </div>
      <div className="testimonial-carousel-container relative w-full mt-24 px-4 ">
        <div
          className="testimonial-carousel flex transition-transform duration-500 gap-8 mx-auto"
          style={{
            transform: `translateX(-${(currentIndex / testimonialsData.length) * 100}%)`, // Moves by 3 cards at once
          }}
        >
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card max-w-[350px] flex-shrink-0 bg-white rounded-xl p-6 shadow-lg relative overflow-visible"
            >
              {/* Profile image positioned above the card */}
              <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 z-20">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={96}
                  height={96}
                  className="rounded-full object-cover border-4 border-gray-200"
                />
              </div>
              <div className="mt-8">
                {/* Adjusted margin-top to ensure space for the image */}
                <RiDoubleQuotesL size={30} color="red" />
                <p className="text-gray-800 mb-4 text-pretty text-sm flex text-left">{testimonial.content}</p>
                <h3 className="text-xl font-bold text-red-500 italic absolute bottom-2 right-2 transform -translate-x-1/2">
                  - {testimonial.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow buttons for navigating */}
      <div className="flex justify-center items-center mt-10 space-x-3">
        <button
          className="text-white hover:text-black bg-white bg-opacity-20 text-sm bg-opacity-50 hover:bg-opacity-100 p-2 rounded-full"
          onClick={goToPrev}
        >
          <IoIosArrowBack />
        </button>
        <button
          className="text-white bg-white hover:text-black bg-opacity-20 text-sm bg-opacity-50 hover:bg-opacity-100 p-2 rounded-full"
          onClick={goToNext}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Testimonial;
