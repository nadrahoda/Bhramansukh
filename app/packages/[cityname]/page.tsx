"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface TourPackage {
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
const page = () => {
  const params = useParams();
  const cityname = params.cityname;
  console.log("ciye", cityname);

  const [loading, setLoading] = useState(true);
  const [tourPackages, setTourPackages] = useState<TourPackage[]>();
  useEffect(() => {
    const handleExploreClick = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/searchPackages?searchTerm=${cityname}`
        );
        const data = await response.json();
        console.log("data", data);
        setLoading(false);
        setTourPackages(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    handleExploreClick();
  }, []);

  return (
    <div>
      {" "}
      <div className="space-y-4 bg-red-300 	">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="p-4 grid grid-cols-3">
            {tourPackages?.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/package-details/${encodeURIComponent(pkg.id)}`}
              >
                <div className="p-4 border rounded-md">
                  <h2 className="text-xl font-bold">{pkg.name}</h2>
                  <p>{pkg.description}</p>
                  <p>Price: ₹{pkg.price.toFixed(2)}</p>
                  <p>
                    Location: {pkg.city.name}, {pkg.state.name}
                  </p>
                  {pkg.touristSpot && <p>Spot: {pkg.touristSpot.name}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
