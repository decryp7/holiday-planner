import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/_libraries/prismaExtendedClient";
import {Place, PlaceWithAllData} from "@/app/_models/place";

export async function GET(request: NextRequest) {
    const result = await prisma.place.findMany();
    const places = result.map(p => Place.fromDbPlace(p as PlaceWithAllData));

    return NextResponse.json(places);
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";