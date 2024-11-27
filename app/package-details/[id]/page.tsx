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
      <div className="bg-gray-900 text-white min-h-screen pt-8">
        <div className="flex justify-between mx-12 rounded-xl  p-8 bg-gray-800 ">
         
            <div className="">
              <h1 className="text-3xl font-bold mb-2">{packageDetails.name}</h1>
              <p className="mb-2 text-xl font-semibold text-blue-500">
                Starting price: <span className="text-white font-semibold "> ₹{packageDetails.price}/-</span>
              </p>
              <p className="mb-2 text-white inline-flex p-1 px-3 rounded-full font-semibold text-base items-center  bg-white bg-opacity-30 ">
  <MdLocationOn className="text-blue-500 mr-1" /> {packageDetails.startingCity} to {packageDetails.endingCity}
</p>
<h1 className="text-lg font-bold ">Duration: <span className="text-blue-400 font-semibold text-sm">{packageDetails.duration}</span></h1>
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
             
              <p className="mb-2">
                <strong>Location:</strong> {packageDetails.city.name}, {packageDetails.state.name}
              </p>
            
              {packageDetails.touristSpot && (
                <p className="mb-2 ">
                  <strong>Tourist Spot:</strong>{" "}
                <span className="italic">{packageDetails.touristSpot.name}</span>  
                </p>
              )}
              </div>
              <div className=" justify-center items-center mt-6 ">
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
              
              <div className="mt-8 p-6">
                {packageDetails.itinerary ? (
                  <div>
                    <h2 className="text-xl font-semibold mt-8 mb-4">
                      Itinerary
                    </h2>
                    {Object.keys(packageDetails.itinerary).map((dayKey) => {
                      const day = packageDetails.itinerary?.[dayKey]; // Use optional chaining
                      return day ? (
                        <div key={dayKey} className="mb-4">
                          <h3 className="font-bold">{day?.title}</h3>
                          <ul className="list-disc pl-5">
                            {day.activities.map((activity, index) => (
                              <li key={index} className="mb-2">
                                <strong>{activity.time}:</strong>{" "}
                                {activity.description}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null; 
                    })}
                  </div>
                ) : (
                  <p>Itinerary not available</p>
                )}
              </div>
          

     

     

        <h2 className="text-xl font-semibold mt-8 mb-4">Similar Packages</h2>
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
          <p>No similar packages found.</p>
        )}
         </div>
    </>
  );
}
