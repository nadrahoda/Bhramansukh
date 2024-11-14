import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Package ID is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch the package details using the provided ID
    const packageDetails = await prisma.package.findUnique({
      where: { id: parseInt(id) },
      include: {
        state: true,
        city: true,
        touristSpot: true,
      },
    });

    if (!packageDetails) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    // Fetch similar packages based on the cityId
    const similarPackages = await prisma.package.findMany({
      where: {
        cityId: packageDetails.cityId,
        id: { not: packageDetails.id }, // Exclude the current package
      },
      orderBy: { createdAt: "desc" },
      include: {
        state: true,
        city: true,
        touristSpot: true,
      },
      take: 5, // Limit the number of similar packages
    });

    return NextResponse.json({
      packageDetails,
      similarPackages,
    });
  } catch (error) {
    console.error("Error fetching package details:", error);
    return NextResponse.json(
      { error: "Error fetching package details" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
