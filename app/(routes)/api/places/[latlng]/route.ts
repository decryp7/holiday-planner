import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params } : {params: {latlng: string }}) {
    const latlng = params.latlng.split(",");
    if(latlng.length < 2 ||
        +latlng[0] == undefined ||
        +latlng[1] == undefined){
        return NextResponse.json(`latlng is not in correct format! datetime: ${params.latlng}`,
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

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";