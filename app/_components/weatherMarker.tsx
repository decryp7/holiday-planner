import React, {useRef} from "react";
import Image from "next/image";
import {DateTime} from "luxon";
import {useRecoilState, useSetRecoilState} from "recoil";
import {selectedWeatherMarkerState} from "@/app/_state/selectedWeatherMarkerState";
import {activeCardState} from "@/app/_state/activeCardState";

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
    const setSelectedWeatherMarker = useSetRecoilState(selectedWeatherMarkerState);
    const [activeCard, setActiveCard] = useRecoilState(activeCardState);
    const currentHour = DateTime.now().hour;
    const now = currentHour > 7 && currentHour < 19 ? 'day' : 'night';

    function handleClick(event: React.MouseEvent<HTMLDivElement>){
        if(weatherMarkerRef.current == null){
            return;
        }

        event.stopPropagation();
        setActiveCard("weather");
        setSelectedWeatherMarker(weatherMarkerRef.current.dataset.location);
    }

    return <div data-start-time={props.startTime} data-location={props.location} className="flex flex-col w-16 h-fit hover:cursor-pointer"
                onClick={handleClick} ref={weatherMarkerRef}>
        <div className="relative w-[100%] h-fit left-1/2 -translate-x-1/2">
            <Image
                className="w-full h-auto opacity-90"
                src={`https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${now}/${props.icon}.svg`}
                alt={props.value}
                width="0"
                height="0"
                sizes="100vw" />
            <div className="absolute w-full top-1/2 -translate-y-1/2 text-[1em] text-center text-gray-800 font-black">
                <div>{props.value}</div>
                <div>{props.temperature}</div>
            </div>
        </div>
    </div>
});

WeatherMarker.displayName = "WeatherMarker";

export default WeatherMarker;