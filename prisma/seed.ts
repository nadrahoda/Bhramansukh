import { PrismaClient } from "@prisma/client";
import indiaData from "../public/data/india_locations.json"; // Make sure to place the JSON file correctly

const prisma = new PrismaClient();

interface TouristSpotsMap {
  [key: string]: string[]; // This type defines that each city name maps to an array of tourist spots.
}

interface StateData {
  state: string;
  cities: string[];
  touristSpots: TouristSpotsMap[]; // An array of maps where each map represents city-tourist spot mapping
}

async function main() {
  // Clear existing data
  await prisma.package.deleteMany({});
  await prisma.touristSpot.deleteMany({});
  await prisma.city.deleteMany({});
  await prisma.state.deleteMany({});

  console.log("Seeding started!");

  const statesData = indiaData as StateData[];

  for (const stateData of statesData) {
    // Create state
    const state = await prisma.state.create({
      data: { name: stateData.state },
    });
    

    // Iterate over each city
    for (const cityName of stateData.cities) {
      const city = await prisma.city.create({
        data: {
          name: cityName,
          state: { connect: { id: state.id } },
        },
      });

      // Find the corresponding tourist spots for the city
      const citySpots = stateData.touristSpots.find(
        (spot) => Object.keys(spot)[0] === cityName
      );

      // Create tourist spots for the city
      if (citySpots && citySpots[cityName]) {
        for (const spotName of citySpots[cityName]) {
          const touristSpot = await prisma.touristSpot.create({
            data: {
              name: spotName,
              city: { connect: { id: city.id } },
            },
          });

          // Create packages for each tourist spot
          await prisma.package.create({
            data: {
              name: `${spotName} Tour Package`,
              description: `Enjoy a trip to ${spotName} in ${cityName}, ${stateData.state}.`,
              price: parseFloat((Math.random() * 5000 + 5000).toFixed(2)), // Random price between 5000 - 10000
              state: { connect: { id: state.id } },
              city: { connect: { id: city.id } },
              touristSpot: { connect: { id: touristSpot.id } },
            },
          });
        }
      }

      // Create a city-level package
      await prisma.package.create({
        data: {
          name: `${cityName} City Tour`,
          description: `Explore the beautiful city of ${cityName} in ${stateData.state}.`,
          price: parseFloat((Math.random() * 5000 + 7000).toFixed(2)), // Random price between 7000 - 12000
          state: { connect: { id: state.id } },
          city: { connect: { id: city.id } },
        },
      });
    }

    // Create a state-level package
    await prisma.package.create({
      data: {
        name: `${stateData.state} State Tour`,
        description: `Discover the cultural heritage of ${stateData.state} with this exclusive package.`,
        price: parseFloat((Math.random() * 10000 + 10000).toFixed(2)), // Random price between 10000 - 20000
        state: { connect: { id: state.id } },
      },
    });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Seeding ended");
  });
