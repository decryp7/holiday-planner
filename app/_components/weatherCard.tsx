import React, {FC, Suspense, useEffect, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {activeCardState} from "@/app/_state/activeCardState";
import {selectedWeatherMarkerState} from "@/app/_state/selectedWeatherMarkerState";
import {LocationForecast, TemperatureForecastInfo, WeatherForecastInfo} from "@/app/_models/weather";
import { Card } from "@tremor/react";
import { Metric, Title, Subtitle, Bold, Italic, Text } from "@tremor/react";
import {plainToClass, plainToInstance} from "class-transformer";
import {DateTimeFormat} from "@/app/_libraries/constants";
import {DateTime} from "luxon";
import { Grid, Col } from "@tremor/react";
import Image from "next/image";

const WeatherCard = React.memo((props : {} , context) =>{
    const [activeCard, setActiveCard] = useRecoilState(activeCardState);
    const [selectedWeatherMarker, setSelectedWeatherMarker] = useRecoilState(selectedWeatherMarkerState);
    const [locationForecast, setLocationForecast] = useState<LocationForecast>();

    useEffect(() => {
        if(selectedWeatherMarker === undefined) {
            return;
        }

        setActiveCard("weather");

        const url = `/api/weather/location?${selectedWeatherMarker}`;
        fetch(url)
            .then(res => res.json())
            .then(setLocationForecast);

    }, [selectedWeatherMarker]);

    useEffect(() => {
        if(activeCard != "details"){
            setSelectedWeatherMarker(undefined);
        }
    }, [activeCard]);

    function WeatherDetails() {
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

        return <>
            <Title className="text-2xl">{locationForecast.locationName}</Title>
            {forecastInfos.map((forecastInfo, index)=>
                <Card key={index} className="bg-gray-50">
                    <div className="grid grid-cols-3 gap-5">
                            <Image
                                className="w-full h-full col-span-1"
                                src={`https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${forecastInfo.weather.icon}.svg`}
                                alt={forecastInfo.weather.value}
                                width="0"
                                height="0"
                                sizes="100vw" />
                        <div className="col-span-2">
                            <Title className="">{forecastInfo.weather.startTime.toLocaleString(DateTimeFormat)}</Title>
                            <Metric className="">{`${forecastInfo.weather.value} (${forecastInfo.temperature.toString()})`}</Metric>
                        </div>
                    </div>
                </Card>
                )}
        </>
    }

    return <div className="flex flex-col space-y-2 w-full">
            <WeatherDetails/>
        </div>
});

WeatherCard.displayName = "WeatherCard";

export default WeatherCard;