import React, {useEffect, useRef, useState} from "react";
import GoogleMap from "google-maps-react-markers";
import {useRecoilState} from "recoil";
import {currentLocationState} from "@/app/_state/currentLocationState";
import {LocationForecast, TemperatureForecastInfo, WeatherForecast, WeatherForecastInfo} from "@/app/_models/weather";
import getWeatherForecast from "@/app/_libraries/weather";
import Image from "next/image";
import {plainToClass, plainToInstance} from "class-transformer";
import WeatherMarker from "@/app/_components/weatherMarker";
import { DateTime } from "luxon";
import MyMarker from "@/app/_components/myMarker";

const Map = React.memo((
    props : {}
    , context)=>{

    const [location] = useRecoilState(currentLocationState);
   const [locationForecasts, setLocationForecast] = useState<LocationForecast[]>([]);
    const mapRef = useRef<google.maps.Map | null>(null)
    const [mapReady, setMapReady] = useState(false)

    useEffect(() => {
        const url = `/api/weather/${DateTime.now().toUTC().toMillis()}`;
        fetch(url)
            .then(res => res.json())
            .then(setLocationForecast);
    }, []);

    const onGoogleApiLoaded = ({ map, maps } : {map: google.maps.Map, maps: google.maps.MapsLibrary}) => {
        mapRef.current = map;
        setMapReady(true);

        //add kml
        const kmlLayer = new google.maps.KmlLayer({
            url: `https://www.google.com/maps/d/u/0/kml?mid=1m2ouMpaefFlRqXtfxHMSUHfTp1Wbkps&${DateTime.now().minute}`,
            suppressInfoWindows: true,
            map: map,
        })
        kmlLayer.addListener('click', handleKMLLayerClick.bind(kmlLayer));
    }

    useEffect(() => {
        if(mapRef.current == null ||
        location == undefined ||
        !mapReady){
            return;
        }
        mapRef.current?.setCenter({ lat: location!.lat, lng: location!.lng });
        mapRef.current?.setZoom(15);
    }, [mapRef, mapReady, location]);

    function handleKMLLayerClick(event : google.maps.KmlMouseEvent){
        console.log(event);
        console.log(event.latLng?.lat(), event.latLng?.lng());
    }

    return <GoogleMap
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                defaultCenter={{ lat: 0, lng: 0 }}
                defaultZoom={3}
                mapMinHeight="100vh"
                onGoogleApiLoaded={onGoogleApiLoaded}
            >
        {locationForecasts.map((locationForecast, index) => {
            const weatherForecastInfo = locationForecast.forecast[0] as WeatherForecastInfo;
            const temperatureForecastInfo = plainToClass(TemperatureForecastInfo, locationForecast.forecast[1]);
            if(weatherForecastInfo == undefined && temperatureForecastInfo == undefined){
                return <></>;
            }
            return <WeatherMarker
                key={index}
                lat={locationForecast.lat}
                lng={locationForecast.lng}
                icon={weatherForecastInfo.icon}
                value={weatherForecastInfo.value}
                startTime={weatherForecastInfo.startTime}
                temperature={temperatureForecastInfo.toString()} />
        })}

        {location !== undefined && <MyMarker lat={location.lat} lng={location.lng} size={"4em"} color={"red"} />}
            </GoogleMap>;
});

Map.displayName = "Map";

export default Map;