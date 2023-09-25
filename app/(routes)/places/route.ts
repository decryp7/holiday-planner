import {NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET() {
    const result = await prisma.place.findMany({
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
        }
    });

    return NextResponse.json(result);
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";