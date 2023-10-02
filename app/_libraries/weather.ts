import {forecastElementCode, forecastCode, LocationForecast, WeatherForecast} from "@/app/_models/weather";

export default async function getWeatherForecast(date?: Date) : Promise<LocationForecast[]>{
    console.log(date);
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
            weatherForecasts.push(new WeatherForecast(json, date));
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