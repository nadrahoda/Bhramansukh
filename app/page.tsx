"use client"
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Image from "next/image";
import FilterTrips from "@/components/FilterTrips";
import StrangersUnite from "@/components/StrangersUnite";
// import TreksCarousel from "../components/TreksCarousel"
import StatesCarousel from "@/components/StatesCarousel";
import Testimonial from "@/components/Testimonial";
import WhyChooseUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
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
