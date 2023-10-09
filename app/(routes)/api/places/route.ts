import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/_libraries/prismaExtendedClient";

export async function GET(request: NextRequest) {
    console.log(Array.from(request.nextUrl.searchParams.keys()));

    const result = await prisma.place.findMany();

    return NextResponse.json(result);
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";