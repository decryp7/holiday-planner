import {NextRequest, NextResponse} from "next/server";
import {LocationForecast} from "@/app/_models/weather";
import getWeatherForecast from "@/app/_libraries/weather";
import { DateTime } from "luxon";

async function HandleDatetimeRequest(searchParams: URLSearchParams) {
    if(searchParams.size < 1){
        return NextResponse.json(`Missing datetime parameter!`,
            {status: 400, statusText: "Missing datetime parameter!"});
    }

    const datetimeParam = Array.from(searchParams.keys())[0];
    const datetime = DateTime.fromMillis(+datetimeParam);
    if(isNaN(+datetime)){
        return NextResponse.json(`Datetime is not in correct format! datetime: ${datetimeParam}`,
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

async function HandleLocationRequest(searchParams: URLSearchParams) {
    if(searchParams.size < 1){
        return NextResponse.json(`Missing location parameter!`,
            {status: 400, statusText: "Missing location parameter!"});
    }

    const locationParam = Array.from(searchParams.keys())[0];

    let weatherForecasts: LocationForecast[] = [];

    try {
        weatherForecasts = await getWeatherForecast();
    }catch (e: any){
        const message = `Get weather forecast error. ${e.message}.`;
        return NextResponse.json(message, {status:500, statusText: "Error getting weather forecast"});
    }

    return NextResponse.json(weatherForecasts.find(f => f.locationName === locationParam));
}

export async function GET(request: NextRequest, { params } : { params: {searchtype: string}}) {
    switch (params.searchtype) {
        case "datetime":
            return HandleDatetimeRequest(request.nextUrl.searchParams);
        case "location":
            return HandleLocationRequest(request.nextUrl.searchParams);
        default:
            return NextResponse.json(`Unknown search type! searchtype: ${params.searchtype}`,
                {status: 400, statusText: "Unknown search type!"});
    }
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";