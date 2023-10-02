import {NextRequest, NextResponse} from "next/server";
import {CWAForecast, elementCode, forecastCode, LocationForecast, WeatherForecast} from "@/app/_models/weather";
import {forEach} from "lodash";
import getWeatherForecast from "@/app/(routes)/weather/weather";

export async function GET(request: NextRequest, { params } : any) {
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