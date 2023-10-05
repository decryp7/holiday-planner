import React, {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {activeCardState} from "@/app/_state/activeCardState";
import {selectedWeatherMarkerState} from "@/app/_state/selectedWeatherMarkerState";
import {LocationForecast} from "@/app/_models/weather";


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

    return <div>{JSON.stringify(locationForecast)}</div>
});

WeatherCard.displayName = "WeatherCard";

export default WeatherCard;