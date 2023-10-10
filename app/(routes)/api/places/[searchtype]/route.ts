import {NextRequest, NextResponse} from "next/server";
import fs from 'fs';
import path from "path";
import {prisma} from "@/app/_libraries/prismaExtendedClient";
import {Place, PlaceWithAllData} from "@/app/_models/place";

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

    const result = await prisma.place.findMany({
        where: { lat: +latlng[0], lng: +latlng[1] },
    });

    const places = result.map(p => Place.fromDbPlace(p as PlaceWithAllData));

    return NextResponse.json(places);
}

async function HandleNameRequest(searchParams: URLSearchParams) {
    if(searchParams.size < 1){
        return NextResponse.json(`Missing name parameter!`,
            {status: 400, statusText: "Missing name parameter!"});
    }

    const nameParam = Array.from(searchParams.keys())[0];

    const result = await prisma.place.findMany({
        where: { name: nameParam },
    });
    const places = result.map(p => Place.fromDbPlace(p as PlaceWithAllData));

    return NextResponse.json(places);
}

async function HandlePhotosRequest(searchParams: URLSearchParams) {
    if(searchParams.size < 1){
        return NextResponse.json(`Missing placeId parameter!`,
            {status: 400, statusText: "Missing placeId parameter!"});
    }

    const placePhotosFolder = "place-photos";
    const placeIdParam = Array.from(searchParams.keys())[0];
    const photoFolder = path.resolve(".", "public", placePhotosFolder, placeIdParam);

    let photos: string[] = []
    try {
        photos = fs.readdirSync(photoFolder)
            .filter(p => p.endsWith(".jpg"))
            .map(p => `/${placePhotosFolder}/${placeIdParam}/${p}`);
    }catch (e: any){
        return NextResponse.json(`Invalid placeId parameter! ${placeIdParam}`,
            {status: 400, statusText: "Invalid placeId parameter!"});
    }

    return NextResponse.json(JSON.stringify(photos));
}

export async function GET(request: NextRequest, { params } : {params: {searchtype: string }}) {
    switch (params.searchtype) {
        case "latlng":
            return HandleLatLngRequest(request.nextUrl.searchParams);
        case "name":
            return HandleNameRequest(request.nextUrl.searchParams);
        case "photos":
            return HandlePhotosRequest(request.nextUrl.searchParams);
        default:
            return NextResponse.json(`Unknown search type! searchtype: ${params.searchtype}`,
                {status: 400, statusText: "Unknown search type!"});
    }
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";