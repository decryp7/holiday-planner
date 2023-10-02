import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params } : {params: {id: string }}) {

    const place = await prisma.place.findFirst({
        where: {id: Number(params.id)},
        include: {
            tags: {
                select: {
                    tagName: true
                }
            },
            openingHours: {
                select: {
                    dayName: true,
                    from: true,
                    to: true
                }
            }
        }});

    return NextResponse.json(place);
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";