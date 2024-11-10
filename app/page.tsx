
import Image from "next/image";
import Navbar from '../components/Navbar'
import Hero from "@/components/Hero";
import FilterTrips from "@/components/FilterTrips";
import TreksCarousel from "../components/TreksCarousel"
import StatesCarousel from "@/components/StatesCarousel";
import Testimonial from "@/components/Testimonial";
import WhyChooseUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <FilterTrips/>
    <TreksCarousel/>
    <StatesCarousel/>
    <Testimonial/>
    <WhyChooseUs/>
    <FAQ/>
    <Contact/>
    <Footer/>
    </>


  );
}
