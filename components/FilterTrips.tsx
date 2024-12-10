// components/FilterTrips.tsx
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FaArrowRightLong, FaClock } from 'react-icons/fa6'
import { IoLocationSharp } from 'react-icons/io5'
import Image, { StaticImageData } from 'next/image'

import cardImage1 from '../public/assets/rishikesh.jpeg'
import cardImage6 from '../public/assets/manali.jpeg'
import cardImage7 from '../public/assets/goaunite.jpg'
import cardImage9 from '../public/assets/coorg.jpeg'
import cardImage10 from '../public/assets/kerala1.jpeg'
import cardImage11 from '../public/assets/dharamshala.jpeg'
import cardImage12 from '../public/assets/jodhpur.jpg'
import cardImage13 from '../public/assets/darjeeling.jpg'
import salebanner from '../public/assets/sale.jpg'
import cardImage14 from '../public/assets/image10.jpg'
import cardImage15 from '../public/assets/himalayasunite.jpg'
import cardImage16 from '../public/assets/rajasthanunite.jpg'
import cardImage17 from '../public/assets/image12.jpg'
import cardImage18 from '../public/assets/maldives.jpg'
import cardImage19 from '../public/assets/goa1.jpg'
import cardImage20 from '../public/assets/bangkok.jpg'
import cardImage21 from '../public/assets/varanasi.jpg'
import cardImage22 from '../public/assets/hajj.jpg'
import cardImage23 from '../public/assets/amritsar.jpg'
import Modal from './ModalFilterTrip'

// Define types for card data and option
type CardData = {
  id: number
  category: string
  title?: string
  location?: string
  duration?: string
  price?: string
  image: StaticImageData
  details?: {
    subtitle: string
    content: string
    description: string
  }[]
}

const FilterTrips: React.FC = () => {
  const [selectedOption, setSelectedOption] =
    useState<string>('Strangers Unite')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<string | null>(null)

  const [modalTitle, setModalTitle] = useState<string | null>(null)
  const [modalDetails, setModalDetails] = useState<
    { subtitle: string; content: string }[] | null
  >(null)

  const openModal = (
    title: string,
    details: { subtitle: string; content: string }[]
  ) => {
    setModalTitle(title)
    setModalDetails(details)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalTitle(null)
    setModalDetails(null)
  }

  const cardsData: CardData[] = [
    {
      id: 1,
      category: 'Strangers Unite',
      title: 'Rishikesh - Adventure and Spiritual Retreat',
      location: 'Rishikesh',
      duration: '3D/2N',
      price: '₹ 9,500',
      image: cardImage1,
      details: [
        {
          subtitle: 'Duration',
          content: '3 Days, 2 Nights',
          description: ''
        },
        {
          subtitle: 'Group Size',
          content: '12-14 People',
          description: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
  Day 1:
  • Arrival at Rishikesh - Transfer from Delhi by bus (approximately 6-7 hours).
  • Check-in at a riverside luxury resort.
  • Lunch at the resort.
  • Evening: Visit Triveni Ghat for Ganga Aarti.
  • Dinner at the resort.
  • Bonfire and Musical Night.
  
  Day 2:
  • Morning Yoga Session by the river.
  • Breakfast at the resort.
  • Rafting Adventure on the Ganges.
  • Lunch at a local restaurant.
  • Sightseeing - Visit Neelkanth Mahadev Temple and Ram Jhula.
  • Evening snacks at the resort.
  • Dinner at the resort.
  
  Day 3:
  • Breakfast at the resort.
  • Sightseeing - Visit Lakshman Jhula, explore local markets, and visit Parmarth Niketan.
  • Check-out and transfer back to Delhi.
  `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹9,500 per person',
          description: ''
        }
      ]
    },
    {
      id: 2,
      category: 'Strangers Unite',
      title: 'Manali - Snow Adventures and Scenic Views',
      location: 'Manali',
      duration: '4D/3N',
      price: '₹ 11,000',
      image: cardImage6,
      details: [
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Group Size',
          content: '12-14 People',
          description: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
        Day 1:
        • Arrival in Manali - Transfer from Delhi by overnight Volvo bus (14-15 hours).
        • Check-in at a mid-range hotel.
        • Lunch at the hotel.
        • Evening: Relax or explore Mall Road.
        • Dinner at the hotel.
      
        Day 2:
        • Breakfast at the hotel.
        • Sightseeing - Visit Solang Valley for snow activities like paragliding, skiing, and snowboarding.
        • Lunch at Solang Valley.
        • Evening visit to Hidimba Temple and Old Manali.
        • Dinner at the hotel.
      
        Day 3:
        • Breakfast at the hotel.
        • Excursion to Rohtang Pass (if open) for scenic views and snow sports.
        • Lunch on the way back.
        • Evening at leisure or visit Vashisht Hot Springs.
        • Dinner at the hotel.
      
        Day 4:
        • Breakfast at the hotel.
        • Sightseeing - Visit Manu Temple and Naggar Castle.
        • Check-out and transfer back to Delhi by Volvo bus.
        `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹11,000 per person',
          description: ''
        }
      ]
    },
    { id: 3, category: 'Strangers Unite', image: salebanner },
    {
      id: 4,
      category: 'Strangers Unite',
      title: 'Goa - Fun and Beach Activities',
      location: 'Goa',
      duration: '3D/2N',
      price: '₹ 7,500',
      image: cardImage7,
      details: [
        {
          subtitle: 'Duration',
          content: '3 Days, 2 Nights',
          description: ''
        },
        {
          subtitle: 'Group Size',
          content: '12-14 People',
          description: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
        Day 1:
        • Arrival in Goa - Transfer from Mumbai by train or flight (optional).
        • Check-in at a beach resort.
        • Lunch at the resort.
        • Evening: Explore Calangute Beach and Baga Beach for water sports.
        • Dinner at the resort with a beachside view.
        • Nightlife - Visit Tito's or Mambo's for dancing.
      
        Day 2:
        • Breakfast at the resort.
        • Sightseeing - Visit Fort Aguada, Chapora Fort, and Anjuna Beach.
        • Lunch at Anjuna Beach.
        • Water Sports Activities (parasailing, banana boat rides, jet skiing).
        • Dinner at the resort.
      
        Day 3:
        • Breakfast at the resort.
        • Leisure time - Explore the local markets or relax at the beach.
        • Check-out and transfer back to Mumbai.
        `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹7,500 to ₹9,000 per person',
          description: ''
        }
      ]
    },
    {
      id: 5,
      category: 'Strangers Unite',
      title: 'Coorg - Coffee Plantations and Scenic Trails',
      location: 'Coorg',
      duration: '3D/2N',
      price: '₹ 7,300',
      image: cardImage9,
      details: [
        {
          subtitle: 'Duration',
          content: '3 Days, 2 Nights',
          description: ''
        },
        {
          subtitle: 'Group Size',
          content: '12-14 People',
          description: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
        Day 1:
        • Arrival at Coorg - Transfer from Bangalore (5-6 hours by bus).
        • Check-in at a plantation resort.
        • Lunch at the resort.
        • Evening: Visit Abbey Falls and take a stroll in the coffee estates.
        • Dinner at the resort with local Coorgi cuisine.
      
        Day 2:
        • Breakfast at the resort.
        • Sightseeing - Visit Dubare Elephant Camp and Nisargadhama.
        • Lunch at a local restaurant.
        • Trekking at Tadiandamol Peak (medium difficulty).
        • Evening: Relax and enjoy a bonfire at the resort.
        • Dinner at the resort.
      
        Day 3:
        • Breakfast at the resort.
        • Visit the local market for souvenirs.
        • Check-out and transfer back to Bangalore.
        `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹7,300 per person',
          description: ''
        }
      ]
    },
    {
      id: 6,
      category: 'Therapy Travels',
      title: 'Kerala - Ayurvedic Wellness and Backwater Escape',
      location: 'Kerala',
      duration: '4D/3N',
      price: '₹ 15,000',
      image: cardImage10,
      details: [
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Group Size',
          content: '12-14 People',
          description: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
      Day 1:
      • Arrival at Kochi - Transfer to a backwater resort in Alleppey (2-3 hours).
      • Check-in at a lakeside Ayurvedic wellness resort.
      • Lunch at the resort with traditional Kerala Ayurvedic cuisine.
      • Evening: Backwater Boat Ride for tranquil views and healing.
      • Dinner at the resort.
      • Therapy Session: Herbal Ayurvedic Massage for relaxation.
      
      Day 2:
      • Morning Yoga and Ayurvedic Breathing Techniques by the lake.
      • Breakfast at the resort.
      • Ayurvedic Healing Treatment - Detoxifying Kerala massage and Shirodhara therapy (oil dripping therapy).
      • Lunch at the resort.
      • Sightseeing: Visit Alleppey Beach and the Mullackal Temple.
      • Evening: Group meditation session by the lake.
      • Dinner and relaxation at the resort.
      
      Day 3:
      • Breakfast at the resort.
      • Nature Walk through the Kerala backwaters and the local plantations for emotional and mental relaxation.
      • Lunch at the resort.
      • Evening Therapy: Aromatherapy and reflexology treatment.
      • Dinner and a final session of group relaxation.
      
      Day 4:
      • Breakfast at the resort.
      • Check-out and transfer back to Kochi for onward journey.
      `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹15,000 per person',
          description: ''
        }
      ]
    },
    {
      id: 7,
      category: 'Therapy Travels',
      title: 'Coorg - Nature Healing and Wellness Retreat',
      location: 'Coorg',
      duration: '3D/2N',
      price: '₹ 9,000',
      image: cardImage9,
      details: [
        {
          subtitle: 'Duration',
          content: '3 Days, 2 Nights',
          description: ''
        },
        {
          subtitle: 'Group Size',
          content: '12-14 People',
          description: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
      Day 1:
      • Arrival in Coorg - Transfer from Bangalore by bus (5-6 hours).
      • Check-in at a nature retreat nestled in coffee plantations.
      • Lunch at the resort with organic local cuisine.
      • Evening: Forest Therapy Walk for mental relaxation and stress relief.
      • Dinner at the resort.
      • Therapy Session: Aromatherapy and guided relaxation.
      
      Day 2:
      • Morning Yoga and Breathing exercises in the plantation.
      • Breakfast at the resort.
      • Ayurvedic Spa Treatment - Rejuvenating massage using Coorgi herbs.
      • Lunch at the resort.
      • Sightseeing: Visit Abbey Falls, Nisargadhama, and Dubare Elephant Camp.
      • Evening: Group meditation and sound healing session.
      • Dinner and relaxation at the resort.
      
      Day 3:
      • Breakfast at the resort.
      • Visit to a local coffee plantation for relaxation and therapy through nature.
      • Check-out and transfer back to Bangalore.
      `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹9,000 per person',
          description: ''
        }
      ]
    },
    {
      id: 8,
      category: 'Therapy Travels',
      image: salebanner
    },
    {
      id: 9,
      category: 'Therapy Travels',
      title: 'Rishikesh - Spiritual Healing and Yoga Retreat',
      location: 'Rishikesh',
      duration: '3D/2N',
      price: '₹ 10,500',
      image: cardImage1,
      details: [
        {
          subtitle: 'Duration',
          content: '3 Days, 2 Nights',
          description: ''
        },
        {
          subtitle: 'Group Size',
          content: '12-14 People',
          description: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
        Day 1:
        • Arrival in Rishikesh - Transfer from Delhi by bus (6-7 hours).
        • Check-in at a serene riverside wellness resort.
        • Lunch at the resort with Ayurvedic cuisine.
        • Evening: Ganga Aarti at Triveni Ghat.
        • Dinner at the resort.
        • Therapy Session: Sound Healing Meditation by the river.
      
        Day 2:
        • Morning Yoga and Pranayama session by the river.
        • Breakfast at the resort.
        • River Therapy Session - Meditation and floating in the Ganges for emotional and spiritual healing.
        • Lunch at a local café with healthy organic meals.
        • Sightseeing: Visit the Parmarth Niketan Ashram for spiritual healing.
        • Evening Therapy: Ayurvedic wellness massage at the resort.
        • Dinner and relaxation at the resort.
      
        Day 3:
        • Breakfast at the resort.
        • Guided Meditation Session.
        • Check-out and transfer back to Delhi.
        `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹10,500 per person',
          description: ''
        }
      ]
    },
    {
      id: 10,
      category: 'Therapy Travels',
      title: 'Dharamshala - Himalayan Meditation and Healing Escape',
      location: 'Dharamshala',
      duration: '3D/2N',
      price: '₹ 11,500',
      image: cardImage11,
      details: [
        {
          subtitle: 'Duration',
          content: '3 Days, 2 Nights',
          description: ''
        },
        {
          subtitle: 'Group Size',
          content: '12-14 People',
          description: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
      Day 1:
      • Arrival in Dharamshala - Transfer from Delhi by bus (12 hours).
      • Check-in at a wellness retreat surrounded by the Himalayas.
      • Lunch at the resort.
      • Evening: Visit Mcleodganj for Buddhist spiritual exploration.
      • Dinner at the resort.
      • Therapy Session: Tibetan Sound Healing Meditation.
      
      Day 2:
      • Morning Yoga and Mindfulness Meditation session with Himalayan views.
      • Breakfast at the resort.
      • Nature Therapy - A forest walk through Kangra Valley to improve mental clarity and peace.
      • Lunch at a local Tibetan café.
      • Sightseeing: Visit Dalai Lama Temple, Bhagsu Waterfall, and Naddi Viewpoint.
      • Evening: Group meditation and a session of Reiki Healing.
      • Dinner and relaxation at the resort.
      
      Day 3:
      • Breakfast at the resort.
      • Visit to a local monastery for spiritual healing and a deep mindfulness session.
      • Check-out and transfer back to Delhi.
      `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹11,500 per person',
          description: ''
        }
      ]
    },
    {
      id: 11,
      category: 'Exposure Camps',
      title: 'Jodhpur - Adventure and Leadership Exposure Camp',
      location: 'Jodhpur',
      duration: '3D/2N',
      price: '₹ 9,500',
      image: cardImage12,
      details: [
        {
          subtitle: 'Duration',
          content: '3 Days, 2 Nights',
          description: ''
        },
        {
          subtitle: 'Group Size',
          content: '12-14 People',
          description: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
      Day 1:
      • Arrival in Dharamshala - Transfer from Delhi by bus (12 hours).
      • Check-in at a wellness retreat surrounded by the Himalayas.
      • Lunch at the resort.
      • Evening: Visit Mcleodganj for Buddhist spiritual exploration.
      • Dinner at the resort.
      • Therapy Session: Tibetan Sound Healing Meditation.
      
      Day 2:
      • Morning Yoga and Mindfulness Meditation session with Himalayan views.
      • Breakfast at the resort.
      • Nature Therapy - A forest walk through Kangra Valley to improve mental clarity and peace.
      • Lunch at a local Tibetan café.
      • Sightseeing: Visit Dalai Lama Temple, Bhagsu Waterfall, and Naddi Viewpoint.
      • Evening: Group meditation and a session of Reiki Healing.
      • Dinner and relaxation at the resort.
      
      Day 3:
      • Breakfast at the resort.
      • Visit to a local monastery for spiritual healing and a deep mindfulness session.
      • Check-out and transfer back to Delhi.
      `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹11,500 per person',
          description: ''
        }
      ]
    },
    {
      id: 12,
      category: 'Exposure Camps',
      title: 'Darjeeling - Adventure and Cultural Exposure Camp',
      location: 'Darjeeling',
      duration: '4D/3N',
      price: '₹ 12,500',
      image: cardImage13,
      details: [
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Group Size',
          content: '12-14 People',
          description: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
      Day 1:
      • Arrival in Darjeeling - Transfer from Kolkata by train (10-12 hours).
      • Check-in at a hilltop eco-resort.
      • Lunch at the resort.
      • Afternoon Activity: Ice-breaker games and team-building challenges.
      • Evening: Visit to Batasia Loop and War Memorial.
      • Dinner at the resort.
      
      Day 2:
      • Morning: Trekking to Tiger Hill for a panoramic sunrise view.
      • Breakfast at the resort.
      • Lunch at the resort.
      • Afternoon Activity: Tea Garden Visit and interactive session on tea-making.
      • Evening Activity: Cultural exchange and storytelling session about the region's history.
      • Dinner at the resort.
      
      Day 3:
      • Morning Activity: Cable Car Ride for a bird's-eye view of the town.
      • Breakfast at the resort.
      • Lunch at a local restaurant.
      • Afternoon Activity: Trekking to Peace Pagoda.
      • Dinner and bonfire at the resort.
      
      Day 4:
      • Breakfast at the resort.
      • Check-out and transfer to Kolkata by train.
      `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹12,500 per person',
          description: ''
        }
      ]
    },
    { id: 13, category: 'Exposure Camps', image: salebanner },
    {
      id: 14,
      category: 'Exposure Camps',
      title: 'Udaipur - Nature and Team-building Exposure Camp',
      location: 'Udaipur',
      duration: '3D/2N',
      price: '₹ 8,500',
      image: cardImage7,
      details: [
        {
          subtitle: 'Duration',
          content: '3 Days, 2 Nights',
          description: ''
        },
        {
          subtitle: 'Group Size',
          content: '12-14 People',
          description: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
      Day 1:
      • Arrival in Udaipur - Transfer from Ahmedabad by bus (4-5 hours).
      • Check-in at a lakeside heritage camp.
      • Lunch at the camp.
      • Afternoon Activity: Ice-breaking and team-building exercises.
      • Evening: Boat Ride on Lake Pichola to visit Jag Mandir.
      • Dinner at the camp.
      
      Day 2:
      • Morning Activity: Visit City Palace to learn about Rajasthan's royal history.
      • Breakfast at the camp.
      • Lunch at a local restaurant.
      • Afternoon Activity: Visit Sajjangarh Monsoon Palace for panoramic views of Udaipur.
      • Evening Activity: Group discussion on leadership and culture.
      • Dinner and cultural exchange at the camp.
      
      Day 3:
      • Breakfast at the camp.
      • Visit Jagdish Temple for a cultural experience.
      • Lunch at a local café.
      • Check-out and transfer back to Ahmedabad.
      `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹8,500 per person',
          description: ''
        }
      ]
    },
    {
      id: 15,
      category: 'Exposure Camps',
      title: 'Hampi - Cultural and Ecotourism Exposure Camp',
      location: 'Hampi',
      duration: '4D/3N',
      price: '₹ 13,000',
      image: cardImage14,
      details: [
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Group Size',
          content: '12-14 People',
          description: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
      Day 1:
      • Arrival in Hampi - Transfer from Hospet by bus (30 minutes).
      • Check-in at a heritage resort near the ruins.
      • Lunch at the resort.
      • Afternoon Activity: Explore the Virupaksha Temple and nearby ruins.
      • Dinner at the resort.
      
      Day 2:
      • Morning Activity: Cycling Tour of Hampi's ruins and UNESCO heritage sites.
      • Breakfast at the resort.
      • Lunch at the resort.
      • Afternoon Activity: Visit Vittala Temple and Stone Chariot for cultural exposure.
      • Evening Activity: Workshop on sustainable tourism and historical conservation efforts.
      • Dinner and bonfire at the resort.
      
      Day 3:
      • Breakfast at the resort.
      • Visit to Anegundi Village to learn about the local rural life and eco-tourism.
      • Lunch at a local restaurant.
      • Afternoon Activity: Rock Climbing and Rappelling in the Hampi hills.
      • Dinner at the resort.
      
      Day 4:
      • Breakfast at the resort.
      • Check-out and transfer to Hospet for departure.
      `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹13,000 per person',
          description: ''
        }
      ]
    },
    {
      id: 16,
      category: 'Seasonal Packages',
      title: 'Summer Escape: Manali - The Himalayan Getaway',
      location: 'Manali',
      duration: '4D/3N',
      price: '₹ 12,000',
      image: cardImage15,
      details: [
        {
          subtitle: 'Season',
          content: 'Summer (March to June)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Manali is a perfect summer destination offering cool weather and a stunning view of the mountains. The package includes thrilling activities like river rafting and paragliding, along with scenic sightseeing.
      `,
          content: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
      Day 1:
      • Arrival in Manali - Transfer from Delhi by Volvo.
      • Check-in at a riverside resort.
      • Lunch at the resort.
      • Evening Activity: Mall Road Visit for shopping and local sightseeing.
      • Dinner at the resort.
      
      Day 2:
      • Morning Activity: Solang Valley Adventure (paragliding, zorbing).
      • Breakfast at the resort.
      • Lunch in Solang Valley.
      • Afternoon Activity: River Rafting in Beas River.
      • Evening: Relaxation with a bonfire at the resort.
      • Dinner at the resort.
      
      Day 3:
      • Morning Activity: Visit Hidimba Temple.
      • Breakfast at the resort.
      • Lunch at the resort.
      • Afternoon: Visit Rohtang Pass (snow activities, if accessible).
      • Dinner at the resort.
      
      Day 4:
      • Breakfast at the resort.
      • Check-out and transfer to Delhi.
      `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹12,000 per person',
          description: ''
        }
      ]
    },
    {
      id: 17,
      category: 'Seasonal Packages',
      title: 'Monsoon Retreat: Malshej Ghat - Rain-soaked Escape',
      location: 'Malshej',
      duration: '3D/2N',
      price: '₹ 8,000',
      image: cardImage10,
      details: [
        {
          subtitle: 'Season',
          content: 'Monsoon (June to September)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '3 Days, 2 Nights',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Malshej Ghat is a hidden gem during the monsoon season, offering lush greenery, waterfalls, and a tranquil environment. Ideal for nature lovers and solo travelers looking for peace and serenity.
      `,
          content: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
      Day 1:
      • Arrival in Malshej Ghat - Transfer from Mumbai by private vehicle.
      • Check-in at a hilltop resort.
      • Lunch at the resort.
      • Afternoon Activity: Waterfall Exploration and Nature Walk.
      • Dinner at the resort.
      
      Day 2:
      • Morning Activity: Trekking to Pimpalgaon Joga Dam.
      • Breakfast at the resort.
      • Lunch at the resort.
      • Afternoon Activity: Visit the Shivneri Fort.
      • Evening: Bonfire at the resort.
      • Dinner at the resort.
      
      Day 3:
      • Breakfast at the resort.
      • Check-out and transfer to Mumbai.
      `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹8,000 per person',
          description: ''
        }
      ]
    },
    { id: 18, category: 'Seasonal Packages', image: salebanner },
    {
      id: 19,
      category: 'Seasonal Packages',
      title: 'Winter Wonderland: Shimla - Snow-capped Adventure',
      location: 'Shimla',
      duration: '4D/3N',
      price: '₹ 14,500',
      image: cardImage6,
      details: [
        {
          subtitle: 'Season',
          content: 'Winter (December to February)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Shimla offers a magical winter experience with snowfall, skiing, and sightseeing. This package is perfect for solo travelers looking for snow activities and a cozy, festive environment.
      `,
          content: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
      Day 1:
      • Arrival in Shimla - Transfer from Chandigarh by private vehicle.
      • Check-in at a luxury resort.
      • Lunch at the resort.
      • Afternoon Activity: Mall Road & Ridge Visit.
      • Dinner at the resort.
      
      Day 2:
      • Morning Activity: Skiing at Kufri.
      • Breakfast at the resort.
      • Lunch at Kufri.
      • Afternoon Activity: Visit Jakhoo Temple and enjoy panoramic views.
      • Dinner at the resort.
      
      Day 3:
      • Morning Activity: Visit Christ Church and Viceregal Lodge.
      • Breakfast at the resort.
      • Lunch at the resort.
      • Afternoon: Visit Shimla State Museum.
      • Dinner and bonfire at the resort.
      
      Day 4:
      • Breakfast at the resort.
      • Check-out and transfer to Chandigarh.
      `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹14,500 per person',
          description: ''
        }
      ]
    },
    {
      id: 20,
      category: 'Seasonal Packages',
      title: 'Spring Bliss: Coorg - Coffee and Nature Retreat',
      location: 'Coorg',
      duration: '4D/3N',
      price: '₹ 11,500',
      image: cardImage9,
      details: [
        {
          subtitle: 'Season',
          content: 'Spring (March to May)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Coorg is perfect in spring with its coffee plantations, misty hills, and lush greenery. The package includes a blend of nature walks, wildlife encounters, and relaxing activities.
      `,
          content: ''
        },
        {
          subtitle: 'Itinerary Overview',
          description: `
      Day 1:
      • Arrival in Coorg - Transfer from Bangalore by private vehicle.
      • Check-in at a plantation resort.
      • Lunch at the resort.
      • Afternoon Activity: Coffee Plantation Tour.
      • Dinner at the resort.
      
      Day 2:
      • Morning Activity: Visit Abbey Falls and enjoy a nature walk.
      • Breakfast at the resort.
      • Lunch at a local restaurant.
      • Afternoon Activity: Visit Raja's Seat for a stunning view of the valley.
      • Evening: Bonfire and local dance at the resort.
      • Dinner at the resort.
      
      Day 3:
      • Morning Activity: Visit Dubare Elephant Camp for elephant interactions.
      • Breakfast at the resort.
      • Lunch at the camp.
      • Afternoon Activity: Trekking in Nagarhole Wildlife Sanctuary.
      • Dinner at the resort.
      
      Day 4:
      • Breakfast at the resort.
      • Check-out and transfer back to Bangalore.
      `,
          content: ''
        },
        {
          subtitle: 'Cost',
          content: '₹11,500 per person',
          description: ''
        }
      ]
    },
    {
      id: 21,
      category: 'Adventure',
      title: 'Himalayan Adventure: Spiti Valley - The Untouched Beauty',
      location: 'Manali',
      duration: '6D/5N',
      price: '₹ 25,000',
      image: cardImage6,
      details: [
        {
          subtitle: 'Season',
          content: 'Summer (March to June)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '6 Days, 5 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹25,000 - ₹30,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Spiti Valley is perfect for adventure seekers with its rugged terrain, high-altitude treks, and unique Buddhist monasteries. Ideal for solo travelers looking for offbeat destinations and challenging adventures.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 5 nights in a riverside camp and guesthouses
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Trekking, cycling, jeep safari, and monastery visits
      • Sightseeing: Tabo Monastery, Chandratal Lake, Dhankar Monastery, Kibber Village
      • Transfer: Private vehicle from Kullu to Spiti Valley
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, tips, and optional activities (e.g., rafting or additional tours)
      `,
          content: ''
        }
      ]
    },
    {
      id: 22,
      category: 'Adventure',
      title: 'Beach Adventure: Goa - Sun, Surf & Sand',
      location: 'Goa',
      duration: '5D/4N',
      price: '₹ 18,000',
      image: cardImage7,
      details: [
        {
          subtitle: 'Season',
          content: 'Monsoon (June to September)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹18,000 - ₹22,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Goa offers a blend of beach activities, water sports, and vibrant nightlife, making it an ideal destination for solo travelers seeking adventure and fun in the sun.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 4 nights in a beach resort
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Water sports (parasailing, jet skiing), snorkeling, scuba diving, cycling tour
      • Sightseeing: Anjuna Beach, Dudhsagar Waterfalls, Colva Beach
      • Transfer: Airport transfers and local transportation for sightseeing
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Optional meals outside the package, personal expenses
      `,
          content: ''
        }
      ]
    },
    { id: 23, category: 'Adventure', image: salebanner },
    {
      id: 24,
      category: 'Adventure',
      title: 'Desert Adventure: Jaisalmer - The Golden Desert Expedition',
      location: 'Jaisalmer',
      duration: '5D/4N',
      price: '₹ 20,000',
      image: cardImage16,
      details: [
        {
          subtitle: 'Season',
          content: 'Winter (November to February)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹20,000 - ₹24,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Jaisalmer offers an adventurous desert experience, where you can explore golden sand dunes, stay in desert camps, and take camel rides into the Thar Desert.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 4 nights in a desert resort and camp
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Camel ride, jeep safari, desert trekking, folk music performance
      • Sightseeing: Jaisalmer Fort, Patwon Ki Haveli, Sam Sand Dunes
      • Transfer: Private vehicle from Jaisalmer Railway Station to the resort
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, additional activities like luxury camping or extra meals
      `,
          content: ''
        }
      ]
    },
    {
      id: 25,
      category: 'Adventure',
      title:
        'Wildlife Adventure: Jim Corbett National Park - The Wild Encounter',
      location: 'Uttarakhand',
      duration: '4D/3N',
      price: '₹ 16,000',
      image: cardImage17,
      details: [
        {
          subtitle: 'Season',
          content: 'Summer (March to June)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹16,000 - ₹20,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Jim Corbett is one of India's premier wildlife destinations, known for its tiger sightings, bird watching, and jungle safaris. Ideal for solo travelers seeking a thrilling wildlife experience.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 3 nights at a wildlife resort
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Jeep safari, elephant safari, bird watching, nature walks
      • Sightseeing: Garjia Temple, Kosi River, Corbett National Park
      • Transfer: Private vehicle from Ramnagar to Jim Corbett
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, tips, and optional activities like extra safaris or luxury services
      `,
          content: ''
        }
      ]
    },
    {
      id: 26,
      category: 'Family',
      title: 'Family Retreat: Coorg - The Scotland of India',
      location: 'Coorg',
      duration: '5D/4N',
      price: '₹ 35,000',
      image: cardImage9,
      details: [
        {
          subtitle: 'Season',
          content: 'Winter (October to March)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹35,000 - ₹40,000 per family (for 4 members)',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Coorg is known for its scenic beauty, coffee plantations, and relaxing hill stations, making it an ideal destination for family vacations. Enjoy leisurely strolls, coffee tours, and fun outdoor activities.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 4 nights in a family-friendly resort
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Coffee plantation tour, nature walks, cycling, visit to Abbey Falls and Dubare Elephant Camp
      • Sightseeing: Raja's Seat, Omkareshwara Temple, Talacauvery, and Madikeri Fort
      • Transfer: Private vehicle for all transfers from and to the base
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like shopping, and entry fees to some sites
      `,
          content: ''
        }
      ]
    },
    {
      id: 27,
      category: 'Family',
      title: 'Beach Family Getaway: Alibaug - Beach, Fun & Relaxation',
      location: 'Alibaug',
      duration: '4D/3N',
      price: '₹ 28,000',
      image: cardImage7,
      details: [
        {
          subtitle: 'Season',
          content: 'Summer (March to June)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹28,000 - ₹32,000 per family (for 4 members)',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Alibaug offers a perfect beach destination near Mumbai for a family vacation. With calm beaches, family-friendly resorts, and water activities, it's a place where both relaxation and fun coexist.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 3 nights in a family resort near the beach
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Beach volleyball, swimming, boat rides, and visits to nearby forts
      • Sightseeing: Alibaug Beach, Kolaba Fort, Kashid Beach, and Murud Janjira Fort
      • Transfer: Private vehicle for transportation from Mumbai
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, water sports activities (such as parasailing, jet skiing)
      `,
          content: ''
        }
      ]
    },
    { id: 28, category: 'Family', image: salebanner },
    {
      id: 29,
      category: 'Family',
      title: 'Himalayan Family Adventure: Manali - Snow, Nature & Fun',
      location: 'Manali',
      duration: '6D/5N',
      price: '₹ 45,000',
      image: cardImage6,
      details: [
        {
          subtitle: 'Season',
          content: 'Winter (December to February)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '6 Days, 5 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹45,000 - ₹50,000 per family (for 4 members)',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Manali, with its snow-capped peaks, adventure sports, and scenic landscapes, is perfect for a family holiday. Whether it's playing in the snow or exploring local markets, Manali offers endless opportunities for family fun.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 5 nights in a cozy family hotel
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Snow activities (sledding, snowball fights), Solang Valley adventure, and river rafting
      • Sightseeing: Hadimba Temple, Old Manali, Rohtang Pass (subject to snow conditions)
      • Transfer: Private vehicle from Manali Bus Station/ Airport
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, adventure activities like paragliding or skiing (optional)
      `,
          content: ''
        }
      ]
    },
    {
      id: 30,
      category: 'Family',
      title:
        'Wildlife & Nature: Jim Corbett National Park - Safari & Nature Trails',
      location: 'Uttarakhand',
      duration: '4D/3N',
      price: '₹ 35,000',
      image: cardImage17,
      details: [
        {
          subtitle: 'Season',
          content: 'Summer (March to June)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹35,000 - ₹40,000 per family (for 4 members)',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      A family trip to Jim Corbett allows you to connect with nature and witness the majestic wildlife of India. This trip includes thrilling safaris and relaxation time in the lap of nature.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 3 nights at a wildlife resort with family suites
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Jungle safari, nature walks, visit to Garjia Temple, and bird watching
      • Sightseeing: Corbett National Park, Kosi River, and Dhikala Zone (optional)
      • Transfer: Private vehicle for all transfers from Ramnagar
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, additional safaris, and luxury services
      `,
          content: ''
        }
      ]
    },
    {
      id: 31,
      category: 'Nature',
      title: 'Nature & Wilderness: Wayanad - Forest Retreat',
      location: 'Kerala',
      duration: '5D/4N',
      price: '₹ 35,000',
      image: cardImage13,
      details: [
        {
          subtitle: 'Season',
          content: 'Monsoon (June to September)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹20,000 - ₹25,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Wayanad, with its lush green forests, waterfalls, and wildlife sanctuaries, is the perfect destination for nature lovers. The place offers a great combination of scenic beauty and wildlife, including options for hiking and safaris.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 4 nights in a nature resort or treehouse
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Trekking, wildlife safari, visit to Edakkal Caves, and waterfall exploration
      • Sightseeing: Wayanad Wildlife Sanctuary, Pookode Lake, Meenmutty Falls
      • Transfer: Private vehicle for all transfers from Kozhikode to Wayanad
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional adventure activities like zip-lining
      `,
          content: ''
        }
      ]
    },
    {
      id: 32,
      category: 'Nature',
      title:
        'The Himalayan Nature Expedition: Tirthan Valley - Tranquil Retreat',
      location: 'Himachal Pradesh',
      duration: '5D/4N',
      price: '₹ 22,000',
      image: cardImage6,
      details: [
        {
          subtitle: 'Season',
          content: 'Spring (March to June)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹22,000 - ₹27,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Tirthan Valley is a hidden gem in Himachal Pradesh, offering a pristine environment surrounded by the Great Himalayan National Park. It's perfect for nature enthusiasts who enjoy serene riverside walks and forest hikes.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 4 nights in a riverside cottage or eco-resort
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Nature walks, fishing, bird watching, and riverside camping
      • Sightseeing: Great Himalayan National Park, Tirthan River, Jalori Pass
      • Transfer: Private vehicle from Delhi to Tirthan Valley
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, tips, and optional activities like trout fishing
      `,
          content: ''
        }
      ]
    },
    { id: 33, category: 'Nature', image: salebanner },
    {
      id: 34,
      category: 'Nature',
      title: 'Offbeat Nature: Munnar - Tea Gardens and Hillside Escape',
      location: 'Munnar',
      duration: '4D/3N',
      price: '₹ 18,000',
      image: cardImage14,
      details: [
        {
          subtitle: 'Season',
          content: 'Winter (October to February)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹18,000 - ₹22,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Munnar, with its sprawling tea gardens, misty hills, and tranquil ambiance, is ideal for nature lovers. Perfect for those looking for an escape into nature, offering both relaxation and scenic beauty.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 3 nights in a hillside tea estate bungalow
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Tea plantation tour, nature walks, boating at Mattupetty Lake
      • Sightseeing: Eravikulam National Park, Tea Museum, Attukal Waterfalls
      • Transfer: Private vehicle from Kochi to Munnar
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like paragliding or Ayurveda treatments
      `,
          content: ''
        }
      ]
    },
    {
      id: 35,
      category: 'Nature',
      title: 'Wildlife & Nature: Kaziranga National Park - Rhinos & Beyond',
      location: 'Assam',
      duration: '5D/4N',
      price: '₹ 25,000',
      image: cardImage17,
      details: [
        {
          subtitle: 'Season',
          content: 'Winter (October to February)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹18,000 - ₹22,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Munnar, with its sprawling tea gardens, misty hills, and tranquil ambiance, is ideal for nature lovers. Perfect for those looking for an escape into nature, offering both relaxation and scenic beauty.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 3 nights in a hillside tea estate bungalow
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Tea plantation tour, nature walks, boating at Mattupetty Lake
      • Sightseeing: Eravikulam National Park, Tea Museum, Attukal Waterfalls
      • Transfer: Private vehicle from Kochi to Munnar
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like paragliding or Ayurveda treatments
      `,
          content: ''
        }
      ]
    },
    {
      id: 36,
      category: 'Honeymoon',
      title: 'Romantic Escape: Maldives - Paradise for Two',
      location: 'Maldives',
      duration: '5D/4N',
      price: '₹ 1,10,000',
      image: cardImage18,
      details: [
        {
          subtitle: 'Season',
          content: 'Year-round (best from November to April)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹1,10,000 - ₹1,30,000 per couple',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Maldives, with its crystal-clear waters, white sandy beaches, and overwater bungalows, is one of the most romantic destinations. Enjoy intimate candlelit dinners on the beach, private pool villas, and unforgettable sunsets.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 4 nights in a luxury overwater bungalow or beachfront villa
      • Meals: All-inclusive meals (breakfast, lunch, and dinner)
      • Activities: Private beach dinner, sunset cruise, snorkeling, spa treatment for couples
      • Sightseeing: Dolphin watching, local island tour, underwater restaurant visit
      • Transfer: Seaplane or speedboat transfer from Male International Airport to the resort
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like scuba diving or private yacht charter
      `,
          content: ''
        }
      ]
    },
    {
      id: 37,
      category: 'Honeymoon',
      title: 'Mountain Romance: Shimla & Manali - The Hills Beckon',
      location: 'Himachal Pradesh',
      duration: '6D/5N',
      price: '₹ 35,000',
      image: cardImage6,
      details: [
        {
          subtitle: 'Season',
          content: 'Winter (December to February)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '6 Days, 5 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹35,000 - ₹45,000 per couple',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Shimla and Manali offer a perfect combination of scenic mountain views, snowfall, cozy homestays, and adventure activities. This package is ideal for couples looking for a mix of romance and excitement amidst the cool mountain air.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 2 nights in Shimla, 3 nights in Manali (luxury or boutique hotel)
      • Meals: Breakfast and dinner at the stay locations
      • Activities: Snow activities in Manali, romantic walk around Shimla Mall Road, visit to Rohtang Pass, and Hadimba Temple
      • Sightseeing: Kufri, Solang Valley, Manu Temple, Manali Old Market
      • Transfer: Private vehicle for transfers from Delhi to Shimla and Manali
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like paragliding, skiing, and hot air balloon ride
      `,
          content: ''
        }
      ]
    },
    { id: 38, category: 'Honeymoon', image: salebanner },
    {
      id: 39,
      category: 'Honeymoon',
      title: 'Desert Romance: Jaisalmer - Romance Amidst the Sand Dunes',
      location: 'Jaisalmer',
      duration: '4D/3N',
      price: '₹ 30,000',
      image: cardImage7,
      details: [
        {
          subtitle: 'Season',
          content: 'Winter (October to March)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹30,000 - ₹35,000 per couple',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Jaisalmer, known for its golden desert, forts, and palaces, offers a unique romantic experience. Experience the magic of desert safaris, candlelit dinners under the stars, and exploring the beautiful desert architecture.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 3 nights in a heritage hotel or luxury desert camp
      • Meals: Breakfast, lunch, and dinner
      • Activities: Camel safari, visit to Jaisalmer Fort, Patwon Ki Haveli, desert camping with stargazing, and cultural dance performances
      • Sightseeing: Sam Sand Dunes, Gadisar Lake, Kuldhara Village
      • Transfer: Private vehicle for transfers from Jaisalmer Railway Station/ Airport
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like jeep safari, luxury desert dinners
      `,
          content: ''
        }
      ]
    },
    {
      id: 40,
      category: 'Honeymoon',
      title: 'Secluded Bliss: Kerala - Backwaters & Beaches',
      location: 'Kerala',
      duration: '6D/5N',
      price: '₹ 40,000',
      image: cardImage19,
      details: [
        {
          subtitle: 'Season',
          content: 'Monsoon (June to September) or Winter (November to March)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '6 Days, 5 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹40,000 - ₹50,000 per couple',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Kerala, known for its lush landscapes, tranquil backwaters, and pristine beaches, offers couples the perfect romantic retreat. From houseboat cruises to beachside resorts, this destination is all about romance and relaxation.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 2 nights in a luxury houseboat, 3 nights in a beach resort
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Houseboat cruise on the backwaters, Ayurvedic couple spa, beachside bonfire, sunset walk, visit to tea plantations
      • Sightseeing: Alappuzha Backwaters, Varkala Beach, and Thekkady
      • Transfer: Private vehicle for all transfers
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like parasailing or scuba diving
      `,
          content: ''
        }
      ]
    },
    {
      id: 36,
      category: 'Wildlife',
      title:
        'Wildlife Adventure: Ranthambore National Park - A Tigers Territory',
      location: 'Rajasthan',
      duration: '4D/3N',
      price: '₹ 20,000',
      image: cardImage13,
      details: [
        {
          subtitle: 'Season',
          content: 'Monsoon (June to September) or Winter (November to March)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '6 Days, 5 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹40,000 - ₹50,000 per couple',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Kerala, known for its lush landscapes, tranquil backwaters, and pristine beaches, offers couples the perfect romantic retreat. From houseboat cruises to beachside resorts, this destination is all about romance and relaxation.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 2 nights in a luxury houseboat, 3 nights in a beach resort
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Houseboat cruise on the backwaters, Ayurvedic couple spa, beachside bonfire, sunset walk, visit to tea plantations
      • Sightseeing: Alappuzha Backwaters, Varkala Beach, and Thekkady
      • Transfer: Private vehicle for all transfers
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like parasailing or scuba diving
      `,
          content: ''
        }
      ]
    },
    {
      id: 37,
      category: 'Wildlife',
      title: 'Jungle Safari: Jim Corbett National Park - The Land of Tigers',
      location: 'Uttarakhand',
      duration: '5D/4N',
      price: '₹ 25,000',
      image: cardImage14,
      details: [
        {
          subtitle: 'Season',
          content: 'Winter (November to February)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹25,000 - ₹30,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Jim Corbett National Park, the oldest national park in India, is a must-visit for wildlife enthusiasts. Famous for its tiger population and diverse flora and fauna, this park offers thrilling jeep safaris and the chance to spot the elusive tiger, along with other wildlife like elephants and wild boars.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 4 nights in a wildlife resort
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: 2 jungle safaris, nature walks, visit to Corbett Museum, bird watching
      • Sightseeing: Corbett Waterfall, Garjia Temple, and Dhangarhi Gate
      • Transfer: Private vehicle from Ramnagar Railway Station/ Nainital to the resort
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like fishing or elephant rides
      `,
          content: ''
        }
      ]
    },
    { id: 38, category: 'Wildlife', image: salebanner },
    {
      id: 39,
      category: 'Wildlife',
      title:
        'Wildlife Exploration: Kaziranga National Park - The Land of Rhinos',
      location: 'Assam',
      duration: '5D/4N',
      price: '₹ 30,000',
      image: cardImage17,
      details: [
        {
          subtitle: 'Season',
          content: 'Winter (November to February)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹30,000 - ₹35,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Kaziranga National Park in Assam is home to the famous one-horned rhinoceros and a variety of other species like tigers, elephants, and wild buffalo. The park is a UNESCO World Heritage site, offering both jeep and elephant safaris.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 4 nights in a luxury wildlife resort
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Elephant safari, jeep safari, bird watching, nature walks
      • Sightseeing: Kaziranga National Park, Brahmaputra River, and local tea gardens
      • Transfer: Private vehicle for all transfers from Jorhat/ Guwahati to Kaziranga
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like river cruises
      `,
          content: ''
        }
      ]
    },
    {
      id: 40,
      category: 'Wildlife',
      title:
        'Wilderness Safari: Sunderbans National Park - A World of Mangroves',
      location: 'West Bengal',
      duration: '4D/3N',
      price: '₹ 22,000',
      image: cardImage9,
      details: [
        {
          subtitle: 'Season',
          content: 'Winter (November to March)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹22,000 - ₹27,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Sunderbans National Park, located in the delta of the Ganges, offers an exciting adventure for wildlife lovers. Known for its mangrove forests and Bengal tigers, the park also houses saltwater crocodiles, dolphins, and various bird species.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 3 nights in a riverside jungle resort
      • Meals: All meals (breakfast, lunch, and dinner)
      • Activities: Boat safari, nature walks, bird watching, visit to the Sunderbans Tiger Reserve
      • Sightseeing: Sajnekhali Watchtower, Netidhopani Watchtower, and Sudhanyakhali Tiger Camp
      • Transfer: Private vehicle and boat transfer from Kolkata to the resort
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like fishing or guided birding tours
      `,
          content: ''
        }
      ]
    },
    {
      id: 41,
      category: 'Friends',
      title: 'Goa - Sun, Sand & Parties',
      location: 'Goa',
      duration: '4D/3N',
      price: '₹ 18,000',
      image: cardImage7,
      details: [
        {
          subtitle: 'Season',
          content: 'Winter (November to February)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹18,000 - ₹22,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Goa is the ultimate destination for friends looking for a vibrant, fun-filled vacation. Whether it's exploring the beautiful beaches, indulging in water sports, or partying in the lively nightlife, Goa offers an unforgettable escape for any friend group.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 3 nights in a beachside resort or hotel
      • Meals: Breakfast, lunch, and dinner (buffet-style)
      • Activities: Water sports (parasailing, jet-skiing), beach volleyball, sightseeing, party night at clubs
      • Sightseeing: Visit to Calangute Beach, Baga Beach, Anjuna Flea Market, and Old Goa churches
      • Transfer: Private vehicle from Goa Airport/ Railway Station to the resort
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like dolphin watching, shopping, or extra parties
      `,
          content: ''
        }
      ]
    },
    {
      id: 42,
      category: 'Friends',
      title: 'Manali - Adventure, Snow & Mountain Views',
      location: 'Manali',
      duration: '5D/4N',
      price: '₹ 16,000',
      image: cardImage6,
      details: [
        {
          subtitle: 'Season',
          content: 'Summer (March to June)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹16,000 - ₹20,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Manali is perfect for groups of friends looking for adventure, scenic beauty, and some relaxation in the mountains. Enjoy thrilling activities like paragliding, snow activities, trekking, and the serenity of the picturesque landscape.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 4 nights in a resort or hotel with a scenic mountain view
      • Meals: Breakfast, lunch, and dinner (buffet-style)
      • Activities: Paragliding, snow activities, rafting, trekking, bonfire, and music night
      • Sightseeing: Visit to Solang Valley, Rohtang Pass, Hidimba Temple, and Old Manali
      • Transfer: Private vehicle from Manali Bus Stand or Kullu Airport to the resort
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like shopping or spa treatments
      `,
          content: ''
        }
      ]
    },
    { id: 43, category: 'Friends', image: salebanner },
    {
      id: 44,
      category: 'Friends',
      title: 'Kasol - Trekking, Nature, and Riverside Bliss',
      location: 'Himachal Pradesh',
      duration: '5D/4N',
      price: '₹ 14,000',
      image: cardImage1,
      details: [
        {
          subtitle: 'Season',
          content: 'Summer (March to June)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹14,000 - ₹17,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Kasol is a paradise for friends seeking a blend of nature, adventure, and peace. The beautiful Parvati Valley is perfect for trekking, camping, and exploring riverside spots. Kasol also offers a laid-back atmosphere with vibrant cafes and spectacular views.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 4 nights in riverside camps or guesthouses
      • Meals: Breakfast, lunch, and dinner (buffet-style)
      • Activities: Trekking to Kheerganga, riverside camping, bonfire, group games, stargazing
      • Sightseeing: Visit to Chalal Village, Manikaran Sahib, and Parvati River
      • Transfer: Private vehicle from Bhuntar Airport or Kullu Bus Stand to Kasol
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like shopping or extra treks
      `,
          content: ''
        }
      ]
    },
    {
      id: 45,
      category: 'Friends',
      title: 'Bangkok - Shopping, Culture, and Vibrant Nightlife',
      location: 'Bangkok',
      duration: '5D/4N',
      price: '₹ 25,000',
      image: cardImage20,
      details: [
        {
          subtitle: 'Season',
          content: 'Year-round',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹25,000 - ₹30,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Bangkok is a vibrant and dynamic city perfect for a group of friends. From shopping in the floating markets to exploring temples and enjoying the energetic nightlife, Bangkok has something for everyone. Enjoy a mix of culture, adventure, and urban exploration.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 4 nights in a 3-4 star hotel or resort
      • Meals: Breakfast, lunch, and dinner (buffet-style)
      • Activities: Temple tours (Wat Arun, Wat Phra Kaew), river cruise, shopping at Chatuchak Market, visit to Patpong Night Market
      • Sightseeing: Explore the Grand Palace, visit to MBK Shopping Mall, Bangkok National Museum
      • Transfer: Private vehicle and flights (from India to Bangkok)
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like spa treatments, extra shopping, or night clubbing
      `,
          content: ''
        }
      ]
    },
    {
      id: 46,
      category: 'Water Activities',
      title: 'Goa - Sun, Sea & Adventure',
      location: 'Goa',
      duration: '4D/3N',
      price: '₹ 18,000',
      image: cardImage7,
      details: [
        {
          subtitle: 'Season',
          content: 'Winter (November to February)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹18,000 - ₹22,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Goa is the perfect destination for water sports lovers. From parasailing to scuba diving, water skiing, and jet-skiing, the beaches of Goa offer an endless list of water-based activities. Enjoy the sun, sand, and sea with your group or as a solo adventurer.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 3 nights in a beachside resort or hotel
      • Meals: Breakfast, lunch, and dinner (buffet-style)
      • Water Activities: Parasailing, jet-skiing, windsurfing, banana boat ride, and scuba diving (optional)
      • Sightseeing: Visit to Calangute, Baga, and Anjuna Beach, and Old Goa churches
      • Transfer: Private vehicle from Goa Airport/ Railway Station to the resort
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like dolphin watching, shopping, or extra parties
      `,
          content: ''
        }
      ]
    },
    {
      id: 47,
      category: 'Water Activities',
      title: 'Andaman Islands - Underwater Wonders',
      location: 'Andaman & Nicobar',
      duration: '5D/4N',
      price: '₹ 35,000',
      image: cardImage19,
      details: [
        {
          subtitle: 'Season',
          content: 'October to April',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹35,000 - ₹40,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      The Andaman Islands are a tropical paradise for water activities enthusiasts. From exploring coral reefs while snorkeling to diving in crystal-clear waters, this package is perfect for thrill-seekers and those who love underwater exploration.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 4 nights in a beachfront resort or hotel
      • Meals: Breakfast, lunch, and dinner (buffet-style)
      • Water Activities: Scuba diving, snorkeling, underwater sea walking, glass-bottom boat ride, and kayaking
      • Sightseeing: Visit to Havelock Island, Radhanagar Beach, and Cellular Jail
      • Transfer: Private vehicle and ferry transfers from Port Blair to Havelock and other islands
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like fishing trips or spa treatments
      `,
          content: ''
        }
      ]
    },
    { id: 48, category: 'Water Activities', image: salebanner },
    {
      id: 49,
      category: 'Water Activities',
      title: 'Kerala - Backwaters and Beaches',
      location: 'Kerala',
      duration: '5D/4N',
      price: '₹ 20,000',
      image: cardImage10,
      details: [
        {
          subtitle: 'Season',
          content: 'October to March',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹20,000 - ₹25,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Kerala is famous for its backwaters, serene beaches, and tranquil rivers. It’s a haven for water sports lovers, with activities such as kayaking, houseboat cruises, and surfing to enjoy the natural beauty of the state.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 3 nights in a beachfront resort and 1 night in a houseboat
      • Meals: Breakfast, lunch, and dinner (buffet-style)
      • Water Activities: Kayaking, houseboat cruise, speed boating, and surfing
      • Sightseeing: Visit to Varkala Beach, Alleppey backwaters, and Athirappilly Waterfalls
      • Transfer: Private vehicle from Kochi Airport to the resort and houseboat
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like Ayurvedic treatments or fishing trips
      `,
          content: ''
        }
      ]
    },
    {
      id: 50,
      category: 'Water Activities',
      title: 'Bali - Paradise for Water Sports',
      location: 'Bali',
      duration: '6D/5N',
      price: '₹ 45,000',
      image: cardImage1,
      details: [
        {
          subtitle: 'Season',
          content: 'April to October',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '6 Days, 5 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹45,000 - ₹50,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Bali offers an exceptional experience for water sports enthusiasts. From surfing the waves to diving in crystal-clear waters and exploring the vibrant underwater world, Bali is a dream destination for adventure lovers.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 5 nights in a beachfront resort or hotel
      • Meals: Breakfast, lunch, and dinner (buffet-style)
      • Water Activities: Surfing, scuba diving, snorkeling, parasailing, and white-water rafting
      • Sightseeing: Visit to Uluwatu Temple, Tanah Lot, and Tegallalang Rice Terraces
      • Transfer: Private vehicle and flight from India to Bali
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional activities like spa treatments, extra excursions, or shopping
      `,
          content: ''
        }
      ]
    },
    {
      id: 51,
      category: 'Religious',
      title: 'Spiritual Retreat - Varanasi, Rishikesh, Haridwar',
      location: 'Varanasi',
      duration: '5D/4N',
      price: '₹ 15,000',
      image: cardImage21,
      details: [
        {
          subtitle: 'Season',
          content: 'Year-round',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹15,000 - ₹18,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Embark on a transformative journey through India’s most spiritual cities—Varanasi, Rishikesh, and Haridwar. Witness the serene Ganga Aarti in Varanasi, visit the sacred ghats in Haridwar, and experience the peace and tranquility of yoga and meditation in Rishikesh.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 4 nights in spiritual guesthouses or retreat centers
      • Meals: Breakfast, lunch, and dinner (vegetarian meals)
      • Spiritual Activities: Ganga Aarti in Varanasi, spiritual rituals in Haridwar, yoga and meditation sessions in Rishikesh
      • Sightseeing: Explore temples, ghats, and ashrams in Rishikesh and Haridwar
      • Transfer: Private vehicle for all transfers between cities
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional rituals, or spiritual guides
      `,
          content: ''
        }
      ]
    },
    {
      id: 52,
      category: 'Religious',
      title: 'Hajj and Umrah Packages - Makkah and Madinah',
      location: 'Makkah & Madinah',
      duration: '12-15D',
      price: '₹ 2,50,000',
      image: cardImage22,
      details: [
        {
          subtitle: 'Season',
          content: 'Year-round (specific dates for Hajj)',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '12-15 Days',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content:
            '₹2,50,000 - ₹3,00,000 per person (depends on the package and travel arrangements)',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Undertake one of the holiest pilgrimages in Islam, Hajj, or the sacred Umrah journey. Experience the profound spirituality of performing the rituals in Makkah and Madinah, visiting sacred sites like the Masjid al-Haram, the Kaaba, and the Prophet’s Mosque. This package offers a comprehensive journey to fulfill one of the Five Pillars of Islam.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: Accommodation in Makkah and Madinah (hotels close to the holy sites)
      • Meals: Breakfast, lunch, and dinner (halal meals)
      • Spiritual Activities: Performing Hajj or Umrah rituals, including Tawaf, Sa’i, and visits to sacred sites like Mount Arafat, Mina, and Madinah’s Prophet’s Mosque
      • Sightseeing: Visits to significant Islamic landmarks in Makkah and Madinah such as the Cave of Hira, Jannat al-Baqi, and Masjid al-Quba
      • Transfer: Flights (round trip), and private transport in Saudi Arabia for sightseeing and pilgrimage rituals
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, visa fees, additional services like extra guided tours
      `,
          content: ''
        }
      ]
    },
    { id: 53, category: 'Religious', image: salebanner },
    {
      id: 54,
      category: 'Religious',
      title:
        'Tranquil Escape - Kerala (Backwaters, Temples, and Scenic Retreats)',
      location: 'Kerala',
      duration: '5D/4N',
      price: '₹ 18,000',
      image: cardImage10,
      details: [
        {
          subtitle: 'Season',
          content: 'November to March',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '5 Days, 4 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹18,000 - ₹22,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Kerala, known for its backwaters and scenic landscapes, offers a serene spiritual escape. Visit quiet temples, engage in peaceful rituals, and explore the tranquility of Kerala’s backwaters while enjoying a calm, rejuvenating experience.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 4 nights in resorts, spiritual retreats, or heritage guesthouses
      • Meals: Breakfast, lunch, and dinner (local vegetarian cuisine)
      • Spiritual Activities: Visit temples, participate in traditional rituals, and take a peaceful boat ride through Kerala's backwaters
      • Sightseeing: Explore Fort Kochi, the backwaters of Alappuzha, and local cultural sites
      • Transfer: Private vehicle for all transfers and sightseeing
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional excursions, or spa services
      `,
          content: ''
        }
      ]
    },
    {
      id: 55,
      category: 'Religious',
      title: 'Peaceful Journey - Amritsar and Surrounding Areas',
      location: 'Amritsar',
      duration: '4D/3N',
      price: '₹ 12,000',
      image: cardImage23,
      details: [
        {
          subtitle: 'Season',
          content: 'Year-round',
          description: ''
        },
        {
          subtitle: 'Duration',
          content: '4 Days, 3 Nights',
          description: ''
        },
        {
          subtitle: 'Estimated Total Cost',
          content: '₹12,000 - ₹15,000 per person',
          description: ''
        },
        {
          subtitle: 'Package Overview',
          description: `
      Amritsar, home to the iconic Golden Temple, offers a peaceful and spiritually enriching experience. This journey allows you to engage in rituals, witness the calm of the sacred shrine, and explore peaceful sites that promote reflection and inner peace.
      `,
          content: ''
        },
        {
          subtitle: 'Inclusions',
          description: `
      • Stay: 3 nights in peaceful guesthouses or spiritual accommodations
      • Meals: Meals at the community kitchen (Langar) and local vegetarian restaurants
      • Spiritual Activities: Participate in rituals, attend evening prayers at the Golden Temple, and witness the Wagah Border ceremony
      • Sightseeing: Explore the Golden Temple, Jallianwala Bagh, and local peaceful spots
      • Transfer: Private vehicle for comfortable transport and sightseeing
      `,
          content: ''
        },
        {
          subtitle: 'Exclusions',
          description: `
      • Personal expenses, optional services, and donations
      `,
          content: ''
        }
      ]
    }
  ]

  const options = [
    'Strangers Unite',
    'Therapy Travels',
    'Exposure Camps',
    'Seasonal Packages',
    'Adventure',
    'Family',
    'Nature',
    'Honeymoon',
    'Wildlife',
    'Friends',
    'Water Activities',
    'Religious'
  ]

  // Filter cards based on selected option
  const filteredCards = cardsData
    .filter(card => card.category === selectedOption)
    .slice(0, 5)

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
  }

  return (
    <div className='hidden md:flex bg-gray-900 py-20 '>
      {/* Left section (1/4) */}
      <div className='w-1/4 p-8 border-r bg-white rounded-2xl'>
        <h2 className='text-2xl font-semibold mb-4 text-left'>
          Select from our tours
        </h2>
        <div>
          {options.map(option => (
            <label
              key={option}
              className='flex items-center mb-5 cursor-pointer text-sm'
            >
              <input
                type='radio'
                name='filter'
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
                className='hidden'
              />
              <span
                className={`custom-checkbox w-5 h-5 mr-2 border rounded ${
                  selectedOption === option ? 'bg-blue-500' : 'bg-white'
                } cursor-pointer flex items-center justify-center`}
                onClick={() => handleOptionChange(option)}
              >
                {selectedOption === option && (
                  <svg
                    className='w-3 h-3 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                )}
              </span>
              <span
                className={
                  selectedOption === option
                    ? 'text-black font-semibold'
                    : 'text-gray-600'
                }
              >
                {option}
              </span>
              {selectedOption === option && (
                <Link
                  href='/view-all'
                  className='text-blue-500 ml-2 text-xs flex items-center'
                >
                  View All <FaArrowRightLong className='ml-1' size={12} />
                </Link>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Right section (3/4) */}
      <div className='w-3/4 px-4 text-white'>
        <div className='grid grid-cols-1 gap-4 h-full'>
          {filteredCards.length ? (
            <>
              {/* First row: two cards */}
              <div className='grid grid-cols-2 gap-4 col-span-2 md:col-span-3'>
                {filteredCards.slice(0, 2).map(card => (
                  <div
                    key={card.id}
                    className='h-56 p-4 shadow-xl rounded-xl relative'
                    style={{
                      backgroundImage: `url(${card.image.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className='absolute inset-0 bg-black bg-opacity-50 rounded-xl'></div>
                    <div className='absolute inset-0 flex flex-col text-white'>
                      <span className='absolute top-3 left-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full rounded-l-none'>
                        Best Seller
                      </span>
                      <span className='flex absolute top-3 right-3 text-white text-sm items-center'>
                        <FaClock className='mr-1' /> {card.duration}
                      </span>
                      <div className='mt-12 pl-6 flex flex-col items-start'>
                        <h3 className='text-xl px-2 font-semibold text-left'>
                          {card.title}
                        </h3>
                        <p className='px-2 py-1 text-left mt-6 rounded-full flex items-center border border-white inline-block text-xs'>
                          <IoLocationSharp size={16} className='mr-1' />{' '}
                          {card.location}
                        </p>
                      </div>

                      <div className='flex justify-between w-full px-6 mt-6'>
                        <span className='font-semibold text-lg flex items-center'>
                          <span className='text-base'> Starting Cost: </span>
                          <span className='italic flex items-center ml-2 font-bold text-xl'>
                            {card.price}
                          </span>
                        </span>
                        <button
                          onClick={() =>
                            openModal(card.title || '', card.details || [])
                          }
                          className='bg-blue-500 text-white text-xs px-3 py-1 rounded-full transition-transform duration-200 transform hover:scale-105 text-center font-bold'
                        >
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Second row: one card spanning full width */}
              {filteredCards[2] && (
                <div
                  key={filteredCards[2].id}
                  className='h-48 p-4 rounded-xl shadow col-span-2 md:col-span-3'
                  style={{
                    backgroundImage: `url(${filteredCards[2].image.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
              )}

              {/* Third row: two more cards */}
              <div className='grid grid-cols-2 gap-4 col-span-2 md:col-span-3'>
                {filteredCards.slice(3, 5).map(card => (
                  <div
                    key={card.id}
                    className='h-56 p-4 shadow-xl rounded-xl relative'
                    style={{
                      backgroundImage: `url(${card.image.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className='absolute inset-0 bg-black bg-opacity-50 rounded-xl'></div>
                    <div className='absolute inset-0 flex flex-col text-white'>
                      <span className='absolute top-3 left-0 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full rounded-l-none'>
                        Best Seller
                      </span>
                      <span className='flex absolute top-3 right-3 text-white text-sm items-center'>
                        <FaClock className='mr-1' /> {card.duration}
                      </span>
                      <div className='mt-10 pl-6 flex flex-col items-start'>
                        <h3 className='text-xl font-semibold text-left px-2'>
                          {card.title}
                        </h3>
                        <p className='px-2 py-1 text-left mt-6 rounded-full flex items-center border border-white inline-block text-xs'>
                          <IoLocationSharp size={16} className='mr-1' />{' '}
                          {card.location}
                        </p>
                      </div>

                      <div className='flex justify-between w-full px-6 mt-6'>
                        <span className='font-semibold text-lg flex items-center'>
                          <span className='text-base'> Starting Cost: </span>
                          <span className='italic flex items-center ml-2 font-bold text-xl'>
                            {card.price}
                          </span>
                        </span>
                        <button
                          onClick={() =>
                            openModal(card.title || '', card.details || [])
                          }
                          className='bg-blue-500 text-white text-xs px-3 py-1 rounded-full transition-transform duration-200 transform hover:scale-105 text-center font-bold'
                        >
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className='text-center text-gray-300'>
              No cards found for the selected option.
            </p>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title={modalTitle || ''}
          details={modalDetails}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default FilterTrips
