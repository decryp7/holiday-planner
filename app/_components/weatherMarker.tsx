import React from "react";
import Image from "next/image";

const WeatherMarker = React.memo((props : {
    icon: string,
    value: string,
    temperature: string
} , context) =>{

    return <div className="flex flex-col w-12 h-12">
        <div className="relative w-[90%] h-[90%] mx-auto">
            <Image
                className="drop-shadow-md"
                src={`https://www.cwa.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${props.icon}.svg`}
                alt={props.value}
                fill={true}
                style={{objectFit:"contain"}}/>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[1em] text-black font-bold">{props.temperature}</div>
        </div>
        <div className="text-[1em] mx-auto text-black font-bold">{props.value}</div>
    </div>
});

WeatherMarker.displayName = "WeatherMarker";

export default WeatherMarker;