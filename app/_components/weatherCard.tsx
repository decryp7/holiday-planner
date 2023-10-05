import React, {useEffect} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {activeCardState} from "@/app/_state/activeCardState";
import {locationForecastState} from "@/app/_state/locationForecastState";


const WeatherCard = React.memo((props : {} , context) =>{
    const setActiveCard = useSetRecoilState(activeCardState);
    const locationForecast = useRecoilValue(locationForecastState);

    useEffect(() => {
        if(locationForecast != undefined) {
            setActiveCard("weather");
        }
    }, [locationForecast]);

    return <div>{JSON.stringify(locationForecast)}</div>
});

WeatherCard.displayName = "WeatherCard";

export default WeatherCard;