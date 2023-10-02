import {NextResponse} from "next/server";
import {LocationForecast} from "@/app/_models/weather";
import getWeatherForecast from "@/app/_libraries/weather";

export async function GET() {
    let weatherForecasts: LocationForecast[] = [];

    try {
        weatherForecasts = await getWeatherForecast();
    }catch (e: any){
        const message = `Get weather forecast error. ${e.message}.`;
        return NextResponse.json(message, {status:500, statusText: "Error getting weather forecast"});
    }

    return NextResponse.json(weatherForecasts);
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";