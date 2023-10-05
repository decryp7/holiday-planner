import {forecastElementCode, forecastCode, LocationForecast, WeatherForecast} from "@/app/_models/weather";
import { DateTime } from "luxon";

export default async function getWeatherForecast(date?: DateTime) : Promise<LocationForecast[]>{
    const fetches: Promise<Response>[] = [];
    for(const key in forecastCode){
        fetches.push(fetch(`https://opendata.cwa.gov.tw/api/v1/rest/datastore/` +
            `${forecastCode[key]}?` +
            `Authorization=${process.env.CWA_API_KEY}` +
            `&elementName=${[forecastElementCode.weather, forecastElementCode.temperature].join(',')}`));
    }

    const responses = await Promise.all(fetches);

    let weatherForecasts: WeatherForecast[] = [];
    for(const response of responses){
        if(!response.ok){
            throw new Error(`Get weather forecast error. ${await response.text()}`)
        }

        let json;

        try {
            json = await response.json();
            //weather API return datetime in the format "yyyy-MM-dd HH:mm:ss" and UTC+8
            weatherForecasts.push(new WeatherForecast(json, "yyyy-MM-dd HH:mm:ss", "Asia/Taipei", date));
        }catch (e: any){
            throw new Error(`Get weather forecast error. ${e.message}. JSON: ${json}`);
        }
    }

    return weatherForecasts
        .map(f => f.locations)
        .reduce((prev, curr)=> {
            return prev.concat(curr);
        });
}