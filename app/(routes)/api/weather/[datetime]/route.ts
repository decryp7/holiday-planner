import {NextRequest, NextResponse} from "next/server";
import {LocationForecast} from "@/app/_models/weather";
import getWeatherForecast from "@/app/_libraries/weather";
import { DateTime } from "luxon";

export async function GET(request: NextRequest, { params } : { params: {datetime: string}}) {
    const datetime = DateTime.fromMillis(+params.datetime);
    if(isNaN(+datetime)){
        return NextResponse.json(`Datetime is not in correct format! datetime: ${params.datetime}`,
            {status: 400, statusText: "Datetime is not in correct format!"});
    }

    let weatherForecasts: LocationForecast[] = [];

    try {
        weatherForecasts = await getWeatherForecast(datetime);
    }catch (e: any){
        const message = `Get weather forecast error. ${e.message}.`;
        return NextResponse.json(message, {status:500, statusText: "Error getting weather forecast"});
    }

    return NextResponse.json(weatherForecasts);
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";