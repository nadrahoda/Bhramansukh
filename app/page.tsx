"use client"

import { useState } from "react";
import dynamic from "next/dynamic"
import Image from "next/image";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const FilterTrips = dynamic(() => import("@/components/FilterTrips"));
const StrangersUnite = dynamic(() => import("@/components/StrangersUnite"));
const StatesCarousel = dynamic(() => import("@/components/StatesCarousel"));
const Testimonial = dynamic(() => import("@/components/Testimonial"));
const WhyChooseUs = dynamic(() => import("@/components/WhyUs"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Contact = dynamic(() => import("@/components/Contact"));

import whatsapp from '../public/assets/whatsapp.png'

export default function Home() {
  const [search, setSearch] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] =
  useState<string>('Strangers Unite')

  return (
    <>
      <Navbar selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
      <Hero search={search} setSearch={setSearch} />
      {!search && (
     <>
          <FilterTrips selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
          <StrangersUnite />
          {/* <TreksCarousel /> */}
          <StatesCarousel />
          <Testimonial />
          <WhyChooseUs />
          <FAQ />
          <Contact />
      </>
      )}
      <Footer />
       {/* WhatsApp Floating Button */}
       <a
        href="https://wa.me/919155746888" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 bg-white right-6 z-50  p-3 rounded-full shadow-lg  transition"
      >
        <Image
          src={whatsapp}
          alt="WhatsApp"
          className="w-10 h-10"
        />
      </a>
    </>
  );
}
