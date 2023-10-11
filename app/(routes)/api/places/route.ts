import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/_libraries/prismaExtendedClient";
import {Place, PlaceWithAllData} from "@/app/_models/place";

export async function GET(request: NextRequest) {
    const placesParams = request.nextUrl.searchParams;
    const tagsParam = placesParams.get("tags");

    let result = null;
    if(tagsParam !== null && tagsParam.trim().length > 0){
        const tags = tagsParam.trim().split(",");
        const tagClauses: {tags: {some: { tag: {name: string }}}}[] = []

        for(const tag of tags){
            tagClauses.push({
                tags: {
                    some: {
                        tag: {
                            name: tag
                        }
                    }
                }
            })
        }

        result = await prisma.place.findMany({
            where: {
                    AND: tagClauses
            }
        });

    }else{
        result = await prisma.place.findMany();
    }

    const places = result.map(p => Place.fromDbPlace(p as PlaceWithAllData));

    return NextResponse.json(places);
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";