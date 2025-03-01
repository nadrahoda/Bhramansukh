import { NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("searchTerm");

  if (!searchTerm) {
    return NextResponse.json(
      { error: "Search term is required" },
      { status: 400 }
    );
  }

  try {
    const packages = await prisma.package.findMany({
      where: {
        OR: [
          { city: { name: searchTerm } },
          { touristSpot: { name: searchTerm } },
          { state: { name: searchTerm } },
        ],
      },
      orderBy: [
        { city: { name: searchTerm ? "asc" : undefined } },
        { touristSpot: { name: searchTerm ? "asc" : undefined } },
        { createdAt: "desc" },
      ],
      include: {
        state: true,
        city: true,
        touristSpot: true,
      },
    });
    return NextResponse.json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      { error: "Error fetching packages" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
