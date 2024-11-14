import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.package.deleteMany({});
  await prisma.touristSpot.deleteMany({});
  await prisma.city.deleteMany({});
  await prisma.state.deleteMany({});

  // Seed states, cities, tourist spots, and packages
  const data = [
    {
      state: "Maharashtra",
      cities: ["Mumbai", "Pune", "Nashik", "Aurangabad", "Nagpur"],
      touristSpots: {
        Mumbai: ["Gateway of India", "Elephanta Caves", "Marine Drive"],
        Pune: ["Shaniwar Wada", "Aga Khan Palace", "Sinhagad Fort"],
        Nashik: ["Sula Vineyards", "Trimbakeshwar Temple", "Pandavleni Caves"],
        Aurangabad: ["Ajanta Caves", "Ellora Caves", "Bibi Ka Maqbara"],
        Nagpur: ["Deekshabhoomi", "Futala Lake", "Ambazari Lake"]
      }
    },
    {
      state: "Rajasthan",
      cities: ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Pushkar"],
      touristSpots: {
        Jaipur: ["Hawa Mahal", "City Palace", "Amer Fort", "Jantar Mantar"],
        Udaipur: ["City Palace", "Lake Pichola", "Jagdish Temple"],
        Jodhpur: ["Mehrangarh Fort", "Umaid Bhawan Palace", "Mandore Gardens"],
        Jaisalmer: ["Jaisalmer Fort", "Sam Sand Dunes", "Patwon Ki Haveli"],
        Pushkar: ["Pushkar Lake", "Brahma Temple", "Savitri Temple"]
      }
    },
    // Add other states similarly...
  ];

  for (const stateData of data) {
    // Create state
    const state = await prisma.state.create({
      data: { name: stateData.state }
    });

    // Create cities and tourist spots for the state
    for (const cityName of stateData.cities) {
      const city = await prisma.city.create({
        data: {
          name: cityName,
          state: { connect: { id: state.id } }
        }
      });

      // Create tourist spots for the city
      const spots = stateData.touristSpots[cityName];
      if (spots) {
        for (const spotName of spots) {
          const touristSpot = await prisma.touristSpot.create({
            data: {
              name: spotName,
              city: { connect: { id: city.id } }
            }
          });

          // Create packages for each tourist spot
          await prisma.package.create({
            data: {
              name: `${spotName} Tour Package`,
              description: `Enjoy a trip to ${spotName} in ${cityName}, ${stateData.state}.`,
              price: parseFloat((Math.random() * 5000 + 5000).toFixed(2)), // Random price between 5000 - 10000
              state: { connect: { id: state.id } },
              city: { connect: { id: city.id } },
              touristSpot: { connect: { id: touristSpot.id } }
            }
          });
        }
      }
      
      // Create packages for each city
      await prisma.package.create({
        data: {
          name: `${cityName} City Tour`,
          description: `Explore the beautiful city of ${cityName} in ${stateData.state}.`,
          price: parseFloat((Math.random() * 5000 + 7000).toFixed(2)), // Random price between 7000 - 12000
          state: { connect: { id: state.id } },
          city: { connect: { id: city.id } }
        }
      });
    }

    // Create packages for each state
    await prisma.package.create({
      data: {
        name: `${stateData.state} State Tour`,
        description: `Discover the cultural heritage of ${stateData.state} with this exclusive package.`,
        price: parseFloat((Math.random() * 10000 + 10000).toFixed(2)), // Random price between 10000 - 20000
        state: { connect: { id: state.id } }
      }
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
  });
