import React from "react";
import Image from "next/image";
import { DateTime } from "luxon";

const WeatherMarker = React.memo((props : {
    icon: string,
    value: string,
    temperature: string,
    lat: number,
    lng: number,
    startTime: DateTime
} , context) =>{

    const now = DateTime.now().hour > 19 ? 'night' : 'day';

    return <div className="flex flex-col w-16 h-16">
        <div data-start-time={props.startTime} className="relative w-[90%] h-[90%] left-1/2 -translate-x-1/2">
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