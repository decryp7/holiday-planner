import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    return NextResponse.json({});
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";