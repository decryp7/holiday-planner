import {NextResponse} from "next/server";

export async function GET() {
    return NextResponse.json({});
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";