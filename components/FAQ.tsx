"use client"
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaArrowRight } from 'react-icons/fa';

// Define the structure for a question
interface Question {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // index of the open question
  const [showMore, setShowMore] = useState<boolean>(false); // whether to show more questions

  // FAQ questions array
  const questions: Question[] = [
    {
      id: 1,
      question: 'What is the best time to travel?',
      answer:
        'The best time to travel depends on the destination. For most places, spring and autumn offer ideal weather.'
    },
    {
      id: 2,
      question: 'How do I book a trip?',
      answer:
        'You can book your trip directly on our website, or contact our customer support for personalized bookings.'
    },
    {
      id: 3,
      question: 'Can I modify my booking?',
      answer:
        'Yes, you can modify your booking by contacting our support team. Please check the terms and conditions for modification policies.'
    },
    {
      id: 4,
      question: 'What happens if I need to cancel my trip?',
      answer:
        'Cancellations are possible, but subject to the cancellation policy. Be sure to review the cancellation terms when booking.'
    },
    {
      id: 5,
      question: 'Do you offer group discounts?',
      answer:
        'Yes, we offer group discounts on certain trips. Please reach out to our team for more details.'
    },
    {
      id: 6,
      question: 'Are the trips family-friendly?',
      answer:
        'Many of our trips are family-friendly, and we offer specialized tours designed for families with children.'
    },
    {
      id: 7,
      question: 'What happens if my flight is delayed?',
      answer:
        'If your flight is delayed, we will assist you in making alternative arrangements as part of our 24/7 support service.'
    },
    {
      id: 8,
      question: 'Do you provide travel insurance?',
      answer:
        'We offer travel insurance for our customers. You can add it to your booking during checkout.'
    },
    {
      id: 9,
      question: 'Can I travel alone?',
      answer:
        'Yes! We offer solo traveler packages for those who prefer to travel alone.'
    },
    {
      id: 10,
      question: 'How do I know if a trip is available?',
      answer:
        'Availability is updated in real-time on our website. You can also contact our support for up-to-date availability.'
    }
  ];

  // Toggle the answer visibility based on the clicked question index
  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Toggle the "View More" functionality
  const toggleViewMore = () => {
    setShowMore(!showMore);
  };

  // Get the displayed questions based on showMore state
  const displayedQuestions = showMore ? questions : questions.slice(0, 5);

  return (
    <div className='w-full mx-auto p-6 bg-gray-800 text-white shadow-lg'>
      <h2 className='text-gray-400 text-lg uppercase tracking-widest text-center'>FAQ</h2>
      <h4 className='text-white text-2xl md:text-4xl font-bold tracking-wide text-center'>
        Have Any Doubts
      </h4>

      <div className='space-y-4 p-8 shadow-xl'>
        {displayedQuestions.map((item, index) => (
          <div key={item.id}>
            {/* Question with bottom border */}
            <div
              className='flex items-center justify-between cursor-pointer p-3 text-lg font-medium border-b border-gray-600'
              onClick={() => toggleAnswer(index)}
            >
              <span>{item.question}</span>
              <span className='text-xl'>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>

            {/* Answer Section */}
            {openIndex === index && (
              <div className='p-3 text-left bg-gray-700 rounded-lg rounded-t-none text-gray-300'>
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}

        {/* View More Button */}
        {!showMore && (
          <button
            onClick={toggleViewMore}
            className='mt-4 py-2 px-4 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-500 inline-flex flex items-center '
          >
            View More 
          </button>
        )}

        {showMore && (
          <button
            onClick={toggleViewMore}
            className='mt-4 py-2 px-4 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-500 inline-block mx-auto'
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default FAQ;
