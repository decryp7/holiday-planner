import {NextRequest, NextResponse} from "next/server";
import {LocationForecast} from "@/app/_models/weather";
import getWeatherForecast from "@/app/_libraries/weather";
import {DateTime} from "luxon";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const datetimeParam = params.get("datetime");
    const datetime = datetimeParam != null ? DateTime.fromMillis(+datetimeParam) : undefined;
    const location = params.get("location");

    let weatherForecasts: LocationForecast[] = [];

    try {
        weatherForecasts = await getWeatherForecast(datetime, location != null ? location : undefined);
    }catch (e: any){
        const message = `Get weather forecast error. ${e.message}.`;
        return NextResponse.json(message, {status:500, statusText: "Error getting weather forecast"});
    }

    return NextResponse.json(weatherForecasts);
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";