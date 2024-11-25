"use client";
interface PackageDetails {
  id: number;
  name: string;
  description: string;
  price: number;
  stateId: number;
  cityId: number;
  touristSpotId: number | null;
  createdAt: string;
  image?: string
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

interface ApiResponse {
  packageDetails: PackageDetails;
  similarPackages: PackageDetails[];
}

import Navbar from "@/components/Navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image, {StaticImageData} from "next/image";
import kullu from '../../../public/assets/kullu.jpeg'

export default function PackageDetails() {
  const params = useParams();
  const id = params.id;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch package details and similar packages
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
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  // Loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Destructure data with proper type safety
  const { packageDetails, similarPackages } = data!;

  return (
    <>
    <Navbar />
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Package Details */}
      <div className="flex bg-gray-900 text-white w-full justify-center p-12">
  <div className="flex flex-col md:flex-row bg-gray-800 border border-gray-700 shadow-lg rounded-lg p-6  w-full">
    {/* Left Content */}
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-4">{packageDetails.name}</h1>
      <p className="mb-4 text-gray-300">{packageDetails.description}</p>
      <p className="mb-2">
        <strong className="text-white">Price:</strong> ₹{packageDetails.price}
      </p>
      <p className="mb-2">
        <strong className="text-white">State:</strong> {packageDetails.state.name}
      </p>
      <p className="mb-2">
        <strong className="text-white">City:</strong> {packageDetails.city.name}
      </p>
      {packageDetails.touristSpot && (
        <p className="mb-2">
          <strong className="text-white">Tourist Spot:</strong> {packageDetails.touristSpot.name}
        </p>
      )}
    </div>

    {/* Right Image */}
    <div className="flex-1 flex justify-center items-center mt-6 md:mt-0 md:ml-6">
      {packageDetails.image ? (
        <Image
          src={packageDetails.image}
          width={200}
          height={50}
          alt={packageDetails.name || "Package Image"}
          className="rounded-lg h-[280px] w-[250px]"
        />
      ) : (
        <div className="w-[400px] h-[300px] bg-gray-700 flex items-center justify-center rounded-lg">
          <p className="text-gray-400">No Image Available</p>
        </div>
      )}
    </div>
  </div>
</div>
      {/* Similar Packages */}
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
