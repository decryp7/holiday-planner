import React, {Suspense} from "react";
import {useRecoilValue} from "recoil";
import {selectedWeatherMarkerState} from "@/app/_state/selectedWeatherMarkerState";
import {LocationForecast, TemperatureForecastInfo, WeatherForecastInfo} from "@/app/_models/weather";
import {Card, Metric, Title} from "@tremor/react";
import {plainToInstance} from "class-transformer";
import {DateTimeFormat} from "@/app/_libraries/constants";
import {DateTime} from "luxon";
import Image from "next/image";
import LoadingSkeleton from "@/app/_components/loadingSkeleton";

const WeatherCard = React.memo((props : {} , context) =>{
    const selectedWeatherMarker = useRecoilValue(selectedWeatherMarkerState);

    async function WeatherDetails() {
        if(selectedWeatherMarker === undefined){
            return <></>;
        }

        const url = `/api/weather/location?${selectedWeatherMarker}`;
        const locationForecast = await fetch(url)
            .then(res => res.json()) as LocationForecast;

        if(locationForecast === undefined){
            return <></>;
        }
        const weatherForecastInfos: WeatherForecastInfo[] = [];
        const temperatureForecastInfos: TemperatureForecastInfo[] = [];

        for(const forecast of locationForecast.forecast){
            if('icon' in forecast){
                weatherForecastInfos.push(plainToInstance(WeatherForecastInfo, forecast));
            }else{
                temperatureForecastInfos.push(plainToInstance(TemperatureForecastInfo, forecast));
            }
        }

        const forecastInfos: {weather: WeatherForecastInfo, temperature: TemperatureForecastInfo}[] = [];
        for(let i=0;i<weatherForecastInfos.length;i++){
            const temperatureForecast = temperatureForecastInfos[i];
            if(temperatureForecast != undefined){
                forecastInfos.push({ weather: weatherForecastInfos[i], temperature: temperatureForecast})
            }
        }

        const currentHour = DateTime.now().hour;
        const now = currentHour > 7 && currentHour < 19 ? 'day' : 'night';

        return <>
            <Title className="text-2xl">{locationForecast.locationName}</Title>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
            {forecastInfos.map((forecastInfo, index)=>
                <Card key={index} className="bg-gray-50">
                    <div className="grid grid-cols-3 gap-5">
                            <Image
                                className="w-full h-full col-span-1"
                                src={`https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${now}/${forecastInfo.weather.icon}.svg`}
                                alt={forecastInfo.weather.value}
                                width="0"
                                height="0"
                                sizes="100vh" />
                        <div className="col-span-2">
                            <Title className="">{forecastInfo.weather.startTime.toLocaleString(DateTimeFormat)}</Title>
                            <Metric className="">{`${forecastInfo.weather.value} (${forecastInfo.temperature.toString()})`}</Metric>
                        </div>
                    </div>
                </Card>
                )}
            </div>
        </>
    }

    return <div className="flex flex-col space-y-2 w-full">
        <Suspense fallback={<LoadingSkeleton/>}>
            <WeatherDetails/>
        </Suspense>
        </div>
});

WeatherCard.displayName = "WeatherCard";

export default WeatherCard;