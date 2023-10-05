import React, {useRef} from "react";
import Image from "next/image";
import { DateTime } from "luxon";
import {useRecoilState, useSetRecoilState} from "recoil";
import {locationForecastState} from "@/app/_state/locationForecastState";

const WeatherMarker = React.memo((props : {
    location: string,
    icon: string,
    value: string,
    temperature: string,
    lat: number,
    lng: number,
    startTime: DateTime
} , context) =>{

    const weatherMarkerRef = useRef<HTMLDivElement>(null);
    const setLocationForecast = useSetRecoilState(locationForecastState);
    const currentHour = DateTime.now().hour;
    const now = currentHour < 7 && currentHour > 19 ? 'night' : 'day';

    function handleClick(){
        if(weatherMarkerRef.current == null){
            return;
        }

        const location = weatherMarkerRef.current.dataset.location;
        if(location){
            const url = `/api/weather/location?${location}`;
            fetch(url)
                .then(res => res.json())
                .then(setLocationForecast);
        }
    }

    return <div data-start-time={props.startTime} data-location={props.location} className="flex flex-col w-16 h-16 hover:cursor-pointer"
                onClick={handleClick} ref={weatherMarkerRef}>
        <div className="relative w-[90%] h-[90%] left-1/2 -translate-x-1/2">
            <Image
                className="drop-shadow-[0px_0px_2px_white]"
                src={`https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${now}/${props.icon}.svg`}
                alt={props.value}
                fill={true}
                style={{objectFit:"contain"}}/>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[1em] text-black font-black">{props.temperature}</div>
        </div>
        <div className="text-[1em] mx-auto text-black font-black drop-shadow-[0px_0px_2px_white]">{props.value}</div>
    </div>
});

WeatherMarker.displayName = "WeatherMarker";

export default WeatherMarker;