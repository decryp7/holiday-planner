import React, {Fragment, Suspense, useEffect, useMemo, useState} from "react";
import {useRecoilValue} from "recoil";
import {selectedWeatherMarkerState} from "@/app/_state/selectedWeatherMarkerState";
import {LocationForecast, TemperatureForecastInfo, WeatherForecastInfo} from "@/app/_models/weather";
import {Card, Metric, Title} from "@tremor/react";
import {plainToInstance} from "class-transformer";
import {DateTimeFormat, fetcher} from "@/app/_libraries/constants";
import {DateTime} from "luxon";
import Image from "next/image";
import LoadingSkeleton from "@/app/_components/loadingSkeleton";
import useSWR from "swr";
import ErrorSkeleton from "@/app/_components/errorSkeleton";

const WeatherCard = React.memo((props : {} , context) =>{
    const [mounted, setMounted] = useState(false);
    const selectedWeatherMarker = useRecoilValue(selectedWeatherMarkerState);
    const {data, error, isLoading} =
        useSWR(mounted ? `/api/weather?location=${selectedWeatherMarker}` : null, fetcher);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (error) return <ErrorSkeleton message={`Failed to find weather information for ${selectedWeatherMarker}.`} />
    if (isLoading) return <LoadingSkeleton />

    if(data === undefined || data.length === 0){
        return <></>
    }

    const locationForecast = data[0] as LocationForecast;

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

    return <div className="w-full">
            <Title className="text-2xl">{selectedWeatherMarker}</Title>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
                {forecastInfos.map((forecastInfo, index) =>
                    <Card key={index} className="bg-gray-50">
                        <div className="grid grid-cols-3 gap-5">
                            <Image
                                className="w-full h-full col-span-1"
                                src={`https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${now}/${forecastInfo.weather.icon}.svg`}
                                alt={forecastInfo.weather.value}
                                width="0"
                                height="0"
                                sizes="100vh"/>
                            <div className="col-span-2">
                                <Title
                                    className="">{forecastInfo.weather.startTime.toLocaleString(DateTimeFormat)}</Title>
                                <Metric
                                    className="">{`${forecastInfo.weather.value} (${forecastInfo.temperature.toString()})`}</Metric>
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>;
});

WeatherCard.displayName = "WeatherCard";

export default WeatherCard;