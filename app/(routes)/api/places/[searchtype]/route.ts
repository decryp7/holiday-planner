import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function HandleLatLngRequest(searchParams: URLSearchParams) {
    if(searchParams.size < 1){
        return NextResponse.json(`Missing latlng parameter! e.g. 21.3234234,123.123123`,
            {status: 400, statusText: "Missing latlng parameter!"});
    }

    const latlngParam = Array.from(searchParams.keys())[0];
    const latlng = latlngParam.split(",");
    if(latlng.length < 2 ||
        +latlng[0] == undefined ||
        +latlng[1] == undefined){
        return NextResponse.json(`latlng is not in correct format! latlng: ${latlngParam}`,
            {status: 400, statusText: "latlng is not in correct format!"});
    }

    const place = await prisma.place.findMany({
        where: { lat: +latlng[0], lng: +latlng[1] },
        include: {
            tags: {
                select: {
                    tagName: true
                }
            },
            openHours: {
                select: {
                    day: true,
                    time: true,
                }
            },
            closeHours: {
                select: {
                    day: true,
                    time: true,
                }
            }
        }});

    return NextResponse.json(place);
}

async function HandleNameRequest(searchParams: URLSearchParams) {
    if(searchParams.size < 1){
        return NextResponse.json(`Missing name parameter!`,
            {status: 400, statusText: "Missing name parameter!"});
    }

    const nameParam = Array.from(searchParams.keys())[0];

    const place = await prisma.place.findMany({
        where: { name: nameParam },
        include: {
            tags: {
                select: {
                    tagName: true
                }
            },
            openHours: {
                select: {
                    day: true,
                    time: true,
                }
            },
            closeHours: {
                select: {
                    day: true,
                    time: true,
                }
            }
        }});

    return NextResponse.json(place);
}

export async function GET(request: NextRequest, { params } : {params: {searchtype: string }}) {
    switch (params.searchtype) {
        case "latlng":
            return HandleLatLngRequest(request.nextUrl.searchParams);
        case "name":
            return HandleNameRequest(request.nextUrl.searchParams);
        default:
            return NextResponse.json(`Unknown search type! searchtype: ${params.searchtype}`,
                {status: 400, statusText: "Unknown search type!"});
    }
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";