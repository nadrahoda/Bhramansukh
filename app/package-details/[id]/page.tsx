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

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    <div className="p-4">
      {/* Package Details */}
      <h1 className="text-2xl font-bold mb-4">{packageDetails.name}</h1>
      <p className="mb-2">{packageDetails.description}</p>
      <p className="mb-2">
        <strong>Price:</strong> ₹{packageDetails.price}
      </p>
      <p className="mb-2">
        <strong>State:</strong> {packageDetails.state.name}
      </p>
      <p className="mb-2">
        <strong>City:</strong> {packageDetails.city.name}
      </p>
      {packageDetails.touristSpot && (
        <p className="mb-2">
          <strong>Tourist Spot:</strong> {packageDetails.touristSpot.name}
        </p>
      )}

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
  );
}
