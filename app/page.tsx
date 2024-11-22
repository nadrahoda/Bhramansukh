"use client";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";
import FilterTrips from "@/components/FilterTrips";
import TreksCarousel from "../components/TreksCarousel";
import StatesCarousel from "@/components/StatesCarousel";
import Testimonial from "@/components/Testimonial";
import WhyChooseUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useState } from "react";
import StrangersUnite from "@/components/StrangersUnite";

export default function Home() {
  const [search, setSearch] = useState<boolean>(false);
  return (
    <>
      <Navbar />
      <Hero search={search} setSearch={setSearch} />
      {!search && (
        <>
          <FilterTrips />
          <StrangersUnite/>
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
