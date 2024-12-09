"use client"
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { useState } from "react";

import FilterTrips from "@/components/FilterTrips";
import StrangersUnite from "@/components/StrangersUnite";
import TreksCarousel from "../components/TreksCarousel"
import StatesCarousel from "@/components/StatesCarousel";
import Testimonial from "@/components/Testimonial";
import WhyChooseUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  const [search, setSearch] = useState<boolean>(false);

  return (
    <>
      <Navbar />
      <Hero search={search} setSearch={setSearch} />
      {!search && (
     <>
          <FilterTrips />
          <StrangersUnite />
          <TreksCarousel />
          <StatesCarousel />
          <Testimonial />
          <WhyChooseUs />
          <FAQ />
          <Contact />
      </>
      )}
      <Footer />
    </>
  );
}
