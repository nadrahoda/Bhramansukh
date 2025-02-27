"use client";
import { useSearchParams, useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
export interface TourPackage {
  id: number;
  name: string;
  description: string;
  price: number;
  stateId: number;
  cityId: number;
  touristSpotId: number | null;
  createdAt: string;
  image?: string;
  duration?: string;
  meals: boolean;
  stars: number;
  sightseeing: boolean;
  startingCity: string;
  endingCity: string;
  state: {
    id: number;
    name: string;
  };
  city: {
    id: number;
    name: string;
    stateId: number;
  };
  touristSpot: {
    id: number;
    name: string;
    cityId: number;
  } | null;
}

import { IoLocationOutline } from "react-icons/io5";
import { FaRegBuilding, FaBinoculars } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import Link from "next/link";
import indiaLocations from "../../../public/data/india_locations.json";
import Image from "next/image";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
const page = () => {
  const params = useParams();
  const stateid = params.stateid;
  useEffect(() => {
    handleExploreClick(stateid as string);
  }, [stateid]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [displayedText, setDisplayedText] = useState<string>("");
  const fullText = "Welcome to भ्रMan Sukh";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [loading, setLoading] = useState<boolean | null>(null);
  const [tourPackages, setTourPackages] = useState<TourPackage[]>();
  const [showForm, setShowForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [categories, setCategories] = useState<string[]>([
    "Honeymoon",
    "Family",
    "Solo",
    "Friends",
  ]);
  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };
  const extractDays = (duration: string): number => {
    // Regular expression to match the number before "Days" or "Nights"
    const match = duration.match(/^(\d+)\s*(Days|Day)/i);
    return match ? parseInt(match[1], 10) : 0; // Return the number of days if found, else 0
  };

  const [durations, setDurations] = useState<string[]>([
    "1 to 3",
    "4 to 6",
    "7 to 9",
    "10 to 12",
    "13 or more",
  ]);

  const [budgets, setBudgets] = useState<string[]>([
    "Less Than 10,000",
    "10,000 - 20,000",
    "20,000 - 40,000",
    "40,000 - 60,000",
    "60,000 - 80,000",
    "Above 80,000",
  ]);

  const totalPages = tourPackages
    ? Math.ceil(tourPackages.length / itemsPerPage)
    : 0;
  const displayedPackages = tourPackages?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
    packagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [user, setUser] = useState<any>(null);

  const dayNightOptions = ["5D/4N", "6D/5N", "10D/9N", "Not decided"];
  const monthYearOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const handleExploreClick = async (cityname: string) => {
    // if (!user) {
    //   // If not logged in, show login modal

    //   return;
    // }
    setLoading(true);
    try {
      const response = await fetch(
        `/api/searchPackages?searchTerm=${cityname}&categories=${selectedCategories.join(
          ","
        )}&durations=${selectedDurations.join(
          ","
        )}&budgets=${selectedBudgets.join(",")}`
      );
      const data = await response.json();
      console.log("data", data);
      setLoading(false);
      setTourPackages(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   setLoading(false);
    }
  };
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);

  // Handle filter changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleDurationChange = (duration: string) => {
    setSelectedDurations((prev) =>
      prev.includes(duration)
        ? prev.filter((item) => item !== duration)
        : [...prev, duration]
    );
  };

  const handleBudgetChange = (budget: string) => {
    setSelectedBudgets((prev) =>
      prev.includes(budget)
        ? prev.filter((item) => item !== budget)
        : [...prev, budget]
    );
  };

  const filteredPackages = displayedPackages?.filter((pkg) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) =>
        pkg.name.toLowerCase().includes(category.toLowerCase())
      );

    const matchesDuration =
      selectedDurations.length === 0 ||
      selectedDurations.some((duration) => {
        const packageDays = extractDays(pkg.duration || "");
        if (duration === "1 to 3") {
          return packageDays >= 1 && packageDays <= 3;
        } else if (duration === "4 to 6") {
          return packageDays >= 4 && packageDays <= 6;
        } else if (duration === "7 to 9") {
          return packageDays >= 7 && packageDays <= 9;
        } else if (duration === "10 to 12") {
          return packageDays >= 10 && packageDays <= 12;
        } else if (duration === "13 or more") {
          return packageDays >= 13;
        }
        return false;
      });

    const matchesBudget =
      selectedBudgets.length === 0 ||
      selectedBudgets.some(
        (budget) =>
          (pkg.price < 10000 && budget === "Less Than 10,000") ||
          (pkg.price >= 10000 &&
            pkg.price <= 20000 &&
            budget === "10,000 - 20,000") ||
          (pkg.price > 20000 &&
            pkg.price <= 40000 &&
            budget === "20,000 - 40,000") ||
          (pkg.price > 40000 &&
            pkg.price <= 60000 &&
            budget === "40,000 - 60,000") ||
          (pkg.price > 60000 &&
            pkg.price <= 80000 &&
            budget === "60,000 - 80,000") ||
          (pkg.price > 80000 && budget === "Above 80,000")
      );

    return matchesCategory && matchesDuration && matchesBudget;
  });

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
    <div className="">
      <Navbar
        selectedOption={""}
        setSelectedOption={function (
          value: React.SetStateAction<string>
        ): void {
          throw new Error("Function not implemented.");
        }}
      />
      {loading ? (
        <div className="h-screen w-screen bg-gray-900 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex bg-gray-900 text-white ">
          <div className="w-1/5 p-4 border-r border-gray-700 pl-10 ">
            {/* Back Button */}
            <Link
              href={"/"}
              className="text-white px-4 py-2 rounded-lg mb-4 font-semibold inline-flex items-center underline"
            >
              <FaArrowLeftLong
                className="mr-2 bg-blue-500 rounded-full w-8 p-2 h-8  text-white"
                size={12}
                color="white"
              />{" "}
              Back to Home
            </Link>
            <h2 className="text-lg font-bold mb-4 text-blue-500">Categories</h2>
            <form className="grid grid-cols-2 gap-x-4 gap-y-2 ">
              {categories.map((category, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 text-sm "
                >
                  <input
                    type="checkbox"
                    name="category"
                    value={category}
                    onChange={() => handleCategoryChange(category)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </form>

            {/* Duration Filter */}
            <h2 className="text-lg font-bold mb-4 mt-6 text-blue-500">
              Duration <span className="font-light text-sm">(in Days)</span>
            </h2>
            <form className="grid grid-cols-2 gap-x-4 gap-y-2">
              {durations.map((duration, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="checkbox"
                    name="duration"
                    value={duration}
                    onChange={() => handleDurationChange(duration)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>{duration}</span>
                </label>
              ))}
            </form>

            {/* Budget Filter */}
            <h2 className="text-lg font-bold mb-4 mt-6 text-blue-500">
              Budget <span className="font-light text-sm">(in ₹)</span>
            </h2>
            <form className="grid grid-cols-1 gap-x-4 gap-y-3">
              {budgets.map((budget, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="checkbox"
                    name="budget"
                    value={budget}
                    onChange={() => handleBudgetChange(budget)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>{budget}</span>
                </label>
              ))}
            </form>
          </div>

          {/* Packages */}
          <div className="w-3/5 px-4 pb-10 pl-16">
            <div ref={packagesRef}>
              {loading ? (
                <div>Searching...</div>
              ) : (
                <div className="flex flex-col space-y-4">
                  {filteredPackages?.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="p-4 border border-gray-700 rounded-xl bg-gray-700 text-white flex h-64 space-x-4"
                    >
                      {pkg?.image && (
                        <div className="w-1/4 h-full mb-4">
                          <Image
                            src={pkg.image}
                            alt={pkg.name}
                            className="rounded-md object-cover w-full h-full"
                            width={200}
                            height={200}
                          />
                        </div>
                      )}
                      <div className="w-3/4">
                        <div>
                          <h2 className="text-xl font-bold">{pkg?.name}</h2>
                          <div className="flex space-x-2 font-semibold text-sm mt-1">
                            <p className="text-blue-500">{pkg?.duration} </p>
                            <div className="border-l border-white"></div>
                            <p className="text-gray-400 ">Customizable</p>
                          </div>
                        </div>
                        <div className="mt-8 ">
                          <p className="text-base ">Starting from:</p>
                          <p className="text-blue-500 font-bold text-2xl tracking-wide">
                            ₹{pkg?.price}/-{" "}
                            <span className="text-gray-400 text-xs italic tracking-normal">
                              Per Person
                            </span>
                          </p>
                          <p className="text-xs text-white bg-white bg-opacity-20 rounded-full py-1 px-2 border border-white  items-center block inline-flex font-semibold mt-1">
                            <span className="mr-1">
                              <IoLocationOutline />
                            </span>
                            {pkg?.state?.name}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4 mt-5">
                              <div className="flex items-center flex-col space-y-1">
                                <span className="text-white">
                                  <FaRegBuilding />
                                </span>
                                <span className="text-xs font-light">
                                  Upto {pkg?.stars} stars
                                </span>
                              </div>
                              <div>
                                {pkg?.sightseeing ? (
                                  <div className="flex flex-col items-center space-y-1">
                                    <span className="text-white">
                                      <FaBinoculars />
                                    </span>
                                    <span className="text-xs font-light ">
                                      Sightseeing
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-gray-400">
                                    No Sightseeing
                                  </span>
                                )}
                              </div>
                              <div>
                                {pkg?.meals ? (
                                  <div className="flex flex-col items-center space-y-1">
                                    <span className="text-white">
                                      <GiMeal />
                                    </span>
                                    <span className="text-xs font-light ">
                                      Meals
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-gray-400">
                                    No Meals
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 mt-3">
                              <Link
                                href={`/package-details/${encodeURIComponent(
                                  pkg.id
                                )}`}
                                className="bg-blue-500 text-xs py-2 px-3 rounded-lg font-semibold"
                              >
                                View Details
                              </Link>
                              <button
                                onClick={handleOpenForm}
                                className="bg-gray-400 text-xs py-2 px-3 rounded-lg font-semibold"
                              >
                                Customize Plan
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Pagination Controls */}
                  <div className="flex items-center justify-center space-x-4 mt-6">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 ${
                        currentPage === 1 ? "bg-gray-500" : "bg-blue-600"
                      } text-white rounded`}
                    >
                      Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 ${
                          currentPage === index + 1
                            ? "bg-blue-800"
                            : "bg-blue-600"
                        } text-white rounded`}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 ${
                        currentPage === totalPages
                          ? "bg-gray-500"
                          : "bg-blue-600"
                      } text-white rounded`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default page;
