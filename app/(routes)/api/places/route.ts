import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/app/_libraries/prismaExtendedClient";
import {Place, PlaceWithAllData} from "@/app/_models/place";

export async function GET(request: NextRequest) {
    const placesParams = request.nextUrl.searchParams;
    const tagsParam = placesParams.get("tags");

    let result = null;
    if(tagsParam !== null){
        const tags = tagsParam.split(",");
        const tagClauses: {tags: {some: { tagName: string }}}[] = []

        for(const tag of tags){
            tagClauses.push({
                tags: {
                    some: {
                        tagName: tag
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