// app/results/[destination]/page.tsx
"use client"
import { useParams } from 'next/navigation';

const ResultsPage = () => {
    const { destination } = useParams();

    // Check if 'destination' is an array
    const decodedDestination = Array.isArray(destination)
      ? decodeURIComponent(destination[0]) // Get the first element if it's an array
      : decodeURIComponent(destination || ''); // If it's not an array, decode directly
  
    // Optionally, you can split the destination if it's in the "City, State" format
    const [city, state] = decodedDestination.split(', ');

  return (
    <div>
      <h1>Results for: {city} {state}</h1>
      {/* Use 'city' and 'state' for filtering data */}
    </div>
  );
};

export default ResultsPage;

