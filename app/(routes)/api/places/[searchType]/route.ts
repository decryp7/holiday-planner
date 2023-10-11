import {NextRequest, NextResponse} from "next/server";
import fs from 'fs';
import path from "path";
import {prisma} from "@/app/_libraries/prismaExtendedClient";
import {Place, PlaceWithAllData} from "@/app/_models/place";

const requestHandlers: {[key: string]: (request:NextRequest) => Promise<NextResponse>} = {
    details: HandleDetailsRequest,
    photos: HandlePhotosRequest,
}

async function HandleDetailsRequest(request: NextRequest){
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name");

    if(name === null){
        return NextResponse.json(`Missing name parameter!`,
            {status: 400, statusText: "Missing name parameter!"});
    }

    const result = await prisma.place.findMany({
        where: { name: name },
    });
    const places = result.map(p => Place.fromDbPlace(p as PlaceWithAllData));

    return NextResponse.json(places);
}

async function HandlePhotosRequest(request: NextRequest) {
    const photosParams = request.nextUrl.searchParams;
    const id = photosParams.get("id");
    if(id == null){
        return NextResponse.json(`Missing id parameter!`,
            {status: 400, statusText: "Missing id parameter!"});
    }

    const placePhotosFolder = "place-photos";
    const photoFolder = path.resolve(".", "public", placePhotosFolder, id);

    let photos: string[] = []
    try {
        photos = fs.readdirSync(photoFolder)
            .filter(p => p.endsWith(".jpg"))
            .map(p => `/${placePhotosFolder}/${id}/${p}`);
    }catch (e: any){
        return NextResponse.json(`Invalid id parameter! ${id}`,
            {status: 400, statusText: "Invalid id parameter!"});
    }

    return NextResponse.json(JSON.stringify(photos));
}

export async function GET(request: NextRequest, { params } : {params: {searchType: string }}) {
    if(params.searchType in requestHandlers){
        return requestHandlers[params.searchType](request);
    }

    return NextResponse.json(`Unknown search type! searchType: ${params.searchType}`,
        {status: 400, statusText: "Unknown search type!"});
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";