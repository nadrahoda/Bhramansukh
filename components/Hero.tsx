// app/components/Hero.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import Link from 'next/link';
import indiaLocations from '../public/data/india_locations.json';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [displayedText, setDisplayedText] = useState<string>('');

  const fullText = 'Welcome to भ्रMan Sukh';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const dayNightOptions = ['5D/4N', '6D/5N', '10D/9N', 'Not decided'];
  const monthYearOptions = [
    'December 2024',
    'January 2025',
    'February 2025',
    'March 2025',
    'April 2025',
    'May 2025'
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = new Set<string>();
    indiaLocations.forEach((location: any) => {
      if (location.state.toLowerCase().includes(value.toLowerCase())) {
        filteredSuggestions.add(location.state);
      }
      location.cities.forEach((city: string) => {
        if (city.toLowerCase().includes(value.toLowerCase())) {
          filteredSuggestions.add(`${city} , ${location.state}`);
        }
      });
      location.touristSpots.forEach((spotObj: any) => {
        const cityName = Object.keys(spotObj)[0];
        const spots = spotObj[cityName];
        if (cityName.toLowerCase().includes(value.toLowerCase())) {
          spots.forEach((spot: string) => {
            filteredSuggestions.add(`${spot} , ${location.state}`);
          });
        } else {
          spots.forEach((spot: string) => {
            if (spot.toLowerCase().includes(value.toLowerCase())) {
              filteredSuggestions.add(`${spot} , ${location.state}`);
            }
          });
        }
      });
    });
    setSuggestions(Array.from(filteredSuggestions));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden hero">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/assets/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col mt-48 items-center h-full text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{displayedText}</h1>

        <div className="flex justify-center items-center mt-4 w-11/12 md:w-4/6 space-x-2 bg-gray-200 p-3 rounded-xl">
          <div className="relative flex w-1/2">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaLocationDot className="text-blue-500 mr-2" size={18} />
            </span>
            <input
              type="text"
              placeholder="Search your destination"
              value={inputValue}
              onChange={handleInputChange}
              autoComplete="off"
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full text-black text-sm"
            />
            {suggestions.length > 0 && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-10 w-full max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 hover:bg-gray-200 cursor-pointer text-black flex items-center pl-2"
                  >
                    <FaLocationDot className="text-gray-400 mr-2" size={16} />
                    <span className="whitespace-normal text-sm">
                      {suggestion}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Day/Night Dropdown */}
          <select required defaultValue="" className="w-1/5 bg-white text-gray-800 text-sm px-4 py-2 rounded-lg border border-gray-300">
            <option value="" disabled >Duration</option>
            {dayNightOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Month/Year Dropdown */}
          <select required defaultValue="" className="w-1/5 bg-white text-gray-800 text-sm px-4 py-2 rounded-lg border border-gray-300">
            <option value="" disabled >Select Month</option>
            {monthYearOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <Link
            href={`/results/${inputValue || 'Maharashtra'}`}
            className="w-1/5 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm h-full flex items-center justify-center w-1/5"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;



