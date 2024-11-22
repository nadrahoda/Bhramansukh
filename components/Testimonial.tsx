"use client";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiDoubleQuotesL } from "react-icons/ri";
import Image, { StaticImageData } from "next/image";
import review1 from "../public/assets/farah.jpg";
import review2 from "../public/assets/raza.png";
import review3 from "../public/assets/kamran.png";
import review4 from "../public/assets/sam.png";
import review5 from "../public/assets/anisha.png";
import review6 from "../public/assets/shomail.jpg";
import review7 from "../public/assets/farheen.png";

interface TestimonialData {
  id: number;
  name: string;
  image: string | StaticImageData;
  content: string;
}

const testimonialsData: TestimonialData[] = [
  { id: 1, name: "Farah Rizwan", image: review1, content: "We had an amazing and safe experience in Uttarakhand with Bhramansukh Tours & Travels! The 3D/2N stay (Jan 25-28, 2024) was perfectly organized. The owner was extremely kind and knowledgeable, providing customized itineraries for all types of groups-family, friends, or couples. Highly recommended for a seamless travel experience! 😊" },
  { id: 2, name: "Raza Karim", image: review2, content: "I recently had an amazing trip with Bhramansukh Tour & Travels. From seamless planning to strategically located accommodations and a well-curated itinerary, every detail was perfection. The exceptional customer service, knowledgeable guides, and impeccable transportation made it a stress-free and enjoyable journey. Highly recommend Bhramansukh for a hassle-free and unforgettable travel experience!" },
  { id: 3, name: "Kamran Akhtar", image: review3, content: "Fantastic customer service from Bhramansukh Tour & Travels .They made everything easy with prompt efficient follow up to our requests, all bookings completed smoothly - from Flights to accommodation and travel/ transfers etc. All went smoothly and without a hitch, meaning we could relax and enjoy our holiday! I will highly recommend you book through Bhramansukh." },
  { id: 4, name: "Sam Haq", image: review4, content: "Exceptional service! From booking to the actual tour, every aspect was seamless. The team at Bhramansukh Tour & Travels ensured our trip was unforgettable. Knowledgeable guides, comfortable accommodations, and well-planned itineraries made our experience truly memorable. Highly recommend them for your next adventure!" },
  { id: 5, name: "Anisha Singh", image: review5, content: "Thank you so much, Bhramansukh, for organizing an amazing, memorable, adventurous, and truly enjoyable trip. This experience will forever be one of my best, filled with unforgettable memories. We all started as strangers, but returned as friends, like family—brothers, sisters, and best friends. I hope for many more trips like this in the future." },
  { id: 6, name: "Shomail Akhter", image: review6, content: "I booked a package through Bhramansukh and it turned out to be a great success. From the airport pick up till the airport drop off and everything at the destination was very smooth and well managed. I would really like to appreciate and thank Bhramansukh for their support and coordination throughout the trip. They were very professional and were constantly in touch with us making sure our trip goes smoothly." },
  { id: 7, name: "Farheen Hassan", image: review7, content: "I had so many trips from Bhramansukh and each trip was amazing.They personally make sure all the arrangements are perfect. I highly recommend Bhramansukh for your next trip." },
];

const Testimonial: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const testimonialsToShow = 4; // Number of testimonials visible at once
  const maxIndex = testimonialsData.length - testimonialsToShow;

  const goToNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Move 1 testimonial at a time
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1); // Move 1 testimonial at a time
    }
  };

  return (
    <div className="bg-gray-900 py-10 px-4">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-gray-400 text-lg uppercase tracking-widest">REVIEWS</h3>
        <h1 className="text-white text-4xl font-semibold tracking-wide text-center">What Our Clients Say About Us</h1>
      </div>

      {/* Testimonials Section */}
      <div className="relative w-full mt-28 ">
        <div
          className="flex gap-8 transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * (100 / testimonialsToShow)}%)`, // Shift by 1 testimonial at a time
            width: `${(testimonialsData.length / testimonialsToShow) * 100}%`,
          }}
        >
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="max-w-[350px] bg-white rounded-xl p-5 shadow-lg flex-shrink-0 relative overflow-visible"
            >
              <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2 z-20 ">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-full object-cover border-4 border-gray-200"
                  width={96}
                  height={96}
                  
                />
              </div>
              <RiDoubleQuotesL size={30} color="red" className="mx-auto mb-4 mt-10" />
              <p className="text-gray-800 mb-6 font-normal text-black text-pretty text-sm flex text-left">{testimonial.content}</p>
              <h3 className="text-red-500 text-xl font-bold italic absolute bottom-2 right-2 transform -translate-x-1/2 text-center"> - {testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center mt-8 space-x-3">
        <button
          className={`text-white p-3 rounded-full ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "bg-opacity-50 hover:bg-opacity-100"
          }`}
          onClick={goToPrev}
          disabled={currentIndex === 0}
        >
          <IoIosArrowBack size={20} />
        </button>
        <button
          className={`text-white p-3 rounded-full ${
            currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : "bg-opacity-50 hover:bg-opacity-100"
          }`}
          onClick={goToNext}
          disabled={currentIndex === maxIndex}
        >
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </div>
  );
};

export default Testimonial;

