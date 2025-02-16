"use client";
interface PackageDetails {
  id: number;
  name: string;
  description: string;
  price: number;
  duration?: string
  stateId: number;
  cityId: number;
  touristSpotId: number | null;
  createdAt: string;
  image?: string;
  startingCity: string;
  endingCity: string;
  nearby: string;
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
  itinerary?: {
    [key: string]: {
      title: string;
      activities: {
        time: string;
        description: string;
      }[];
      overnightStay?: string;
    };
  };
}

interface ApiResponse {
  packageDetails: PackageDetails;
  similarPackages: PackageDetails[];
}

import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import { MdOutlineHomeWork } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { TbTrekking } from "react-icons/tb";
import Image, { StaticImageData } from "next/image";

export default function PackageDetails() {
  const params = useParams();
  const id = params.id;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/cityId?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch package details");
        }
        const result: ApiResponse = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const { packageDetails, similarPackages } = data!;

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white pt-8">
        <div className="flex justify-between mx-12 rounded-xl  p-5 bg-gray-800 ">
         
            <div className="">
              <h1 className="text-3xl font-bold mb-2">{packageDetails.name}</h1>
              <p className="mb-2 text-xl font-semibold text-blue-500">
                Starting price: <span className="text-white font-semibold italic"> ₹{packageDetails.price}/-</span>
              </p>
              {/* <p className="mb-2 text-white inline-flex p-1 px-3 rounded-full font-semibold text-base items-center  bg-white bg-opacity-30 ">
  <MdLocationOn className="text-blue-500 mr-1" /> {packageDetails.startingCity} to {packageDetails.endingCity}
</p> */}
<h1 className="text-sm font-bold ">Duration: <span className="text-blue-400 font-semibold text-sm">{packageDetails.duration}</span></h1>
              <div className="flex flex-col">
                <h3 className="font-bold text-blue-500 mt-3">Inclusions:</h3>
                <div className="flex space-x-3 mt-2">
                  <p className="w-16 h-16 bg-gray-900 flex flex-col items-center justify-center px-4 py-3 shadow-xl rounded-lg"> <GiMeal/> <span className="text-xs mt-2 tracking-wide">Meals</span></p>
                  <p className="w-16 h-16 bg-gray-900 flex flex-col items-center justify-center px-4 py-3 shadow-xl rounded-lg"> <FaCar/> <span className="text-xs mt-2 tracking-wide">Stays</span></p>
                  <p className="w-16 h-16 bg-gray-900 flex flex-col items-center justify-center px-4 py-3 shadow-xl rounded-lg"> <MdOutlineHomeWork/> <span className="text-xs mt-2 tracking-wide">Transfer</span></p>
                  <p className="w-16 h-16 bg-gray-900 flex flex-col items-center justify-center px-4 py-3 shadow-xl rounded-lg"> <TbTrekking/> <span className="text-xs mt-2 tracking-wide">Activities</span></p>
                </div>
               
              </div>
              <p className="mb-4 text-gray-300">{packageDetails.description}</p>
             
              <p className="mb-2 mt-2">
                <strong>Location:</strong> {packageDetails.city.name}, {packageDetails.state.name}
              </p>
            
              {packageDetails.touristSpot && (
                <p className="mb-2 ">
                  <strong>Tourist Spot:</strong>{" "}
                <span className="italic">{packageDetails.touristSpot.name}</span>  
                </p>
              )}
              </div>
              <div className=" justify-center items-center  ">
              {packageDetails.image ? (
                <Image
                  src={packageDetails.image}
                  width={200}
                  height={50}
                  alt={packageDetails.name || "Package Image"}
                  className="rounded-lg h-[300px] w-[350px]"
                />
              ) : (
                <div className="w-[400px] h-[300px] bg-gray-700 flex items-center justify-center rounded-lg">
                  <p className="text-gray-400">No Image Available</p>
                </div>
              )}
            </div>
            </div>
            <div className="mt-8 mx-12">
  {packageDetails.itinerary ? (
    <div>
      <h2 className="text-3xl font-semibold mt-5 mb-8 text-blue-500">Itinerary</h2>

      {/* Wrapper for the vertical line and content */}
      <div className="relative">
        {/* Continuous Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-transparent border-l border-gray-300 border-dashed"></div>


        {Object.keys(packageDetails.itinerary || {}).map((dayKey, dayIndex) => {
          const day = packageDetails.itinerary?.[dayKey]; // Safely access the object
          return day ? (
            <div key={dayKey} className="flex items-start mb-8 relative">
              {/* Connector Dot */}
              <div className="flex-none mx-4  relative z-10">
                <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
              </div>

              {/* Content Section */}
              <div className="flex-1">
                {/* Day Heading */}
                <h3 className="text-xl font-bold text-blue-500 mb-2 uppercase">
                  {dayKey}
                </h3>

                {/* Activities */}
                {day.activities.map((activity, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-semibold">{activity.time}: <span className="font-light italic text-gray-400">{activity.description}</span></h4>
                    <p className="text-gray-600"></p>
                  </div>
                ))}

                {/* Overnight Stay (if any) */}
                {day.overnightStay && (
                  <div className="mt-2">
                    <p className="font-semibold text-gray-400">Overnight Stay: <span className="font-light italic text-blue-400">{day.overnightStay}</span></p>
                    <p className="text-gray-600"></p>
                  </div>
                )}
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  ) : (
    <p>Itinerary not available</p>
  )}
</div>




     

     

        <h2 className="text-xl font-semibold mt-8 mb-4 mx-14">Similar Packages</h2>
        {similarPackages.length > 0 ? (
          <ul className="list-disc pl-5">
            {similarPackages.map((pkg) => (
              <li key={pkg.id} className="mb-2">
                <h3 className="font-semibold">{pkg.name}</h3>
                <p>{pkg.description}</p>
                <p>
                  <strong>Price:</strong> ₹{pkg.price}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mx-14">No similar packages found.</p>
        )}
         </div>
    </>
  );
}
