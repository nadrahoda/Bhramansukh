"use client"
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { lazy, Suspense, useState } from "react";

const FilterTrips = lazy(() => import("@/components/FilterTrips"));
const StrangersUnite = lazy(() => import("@/components/StrangersUnite"));
const TreksCarousel = lazy(() => import("../components/TreksCarousel"));
const StatesCarousel = lazy(() => import("@/components/StatesCarousel"));
const Testimonial = lazy(() => import("@/components/Testimonial"));
const WhyChooseUs = lazy(() => import("@/components/WhyUs"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Contact = lazy(() => import("@/components/Contact"));

export default function Home() {
  const [search, setSearch] = useState<boolean>(false);

  return (
    <>
      <Navbar />
      <Hero search={search} setSearch={setSearch} />
      {!search && (
        <Suspense fallback={<div>Loading...</div>}>
          <FilterTrips />
          <StrangersUnite />
          <TreksCarousel />
          <StatesCarousel />
          <Testimonial />
          <WhyChooseUs />
          <FAQ />
          <Contact />
        </Suspense>
      )}
      <Footer />
    </>
  );
}
