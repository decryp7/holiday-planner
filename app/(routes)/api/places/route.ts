import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    console.log(Array.from(request.nextUrl.searchParams.keys()));
    const result = await prisma.place.findMany({
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
        }
    });

    return NextResponse.json(result);
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";