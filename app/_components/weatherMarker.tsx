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

    return <div data-start-time={props.startTime} data-location={props.location}
                className="flex flex-col w-fit h-fit align-middle items-center justify-center hover:cursor-pointer drop-shadow"
                onClick={handleClick} ref={weatherMarkerRef}>
            <Image
                className="w-10 h-auto opacity-90"
                src={`https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/${now}/${props.icon}.svg`}
                alt={props.value}
                width="0"
                height="0"
                sizes="100vw" />
            <div className="flex p-1 break-keep whitespace-nowrap text-gray-800 font-black bg-white bg-opacity-80">
                {props.value} ({props.temperature})
            </div>
    </div>
});

WeatherMarker.displayName = "WeatherMarker";

export default WeatherMarker;