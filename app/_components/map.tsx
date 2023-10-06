import React, {useEffect, useRef, useState} from "react";
import GoogleMap from "google-maps-react-markers";
import {useRecoilState, useSetRecoilState} from "recoil";
import {currentLocationState} from "@/app/_state/currentLocationState";
import {LocationForecast, TemperatureForecastInfo, WeatherForecast, WeatherForecastInfo} from "@/app/_models/weather";
import getWeatherForecast from "@/app/_libraries/weather";
import Image from "next/image";
import {plainToClass, plainToInstance} from "class-transformer";
import WeatherMarker from "@/app/_components/weatherMarker";
import { DateTime } from "luxon";
import MyMarker from "@/app/_components/myMarker";
import {selectedMarkerState} from "@/app/_state/selectedMarkerState";

const Map = React.memo((
    props : {}
    , context)=>{

    const [location] = useRecoilState(currentLocationState);
   const [locationForecasts, setLocationForecast] = useState<LocationForecast[]>([]);
    const mapRef = useRef<google.maps.Map | null>(null)
    const [mapReady, setMapReady] = useState(false)
    const setSelectedMarker = useSetRecoilState(selectedMarkerState);

    useEffect(() => {
        const url = `/api/weather/datetime?${DateTime.now().toUTC().toMillis()}`;
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

        new google.maps.TrafficLayer({map: map});
    }

    function handleKMLLayerClick(event : google.maps.KmlMouseEvent){
        if(event.featureData == undefined){
            console.log("KML Marker feature data is missing!");
        }

        setSelectedMarker(event.featureData!.name);
    }

    return <GoogleMap
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                defaultCenter={{ lat: 0, lng: 0 }}
                defaultZoom={12}
                mapMinHeight="100vh"
                onGoogleApiLoaded={onGoogleApiLoaded}
            >
        {locationForecasts !== undefined && locationForecasts.map((locationForecast, index) => {
            const weatherForecastInfo = locationForecast.forecast[0] as WeatherForecastInfo;
            const temperatureForecastInfo = plainToClass(TemperatureForecastInfo, locationForecast.forecast[1]);
            if(weatherForecastInfo == undefined && temperatureForecastInfo == undefined){
                return <></>;
            }
            return <WeatherMarker
                key={index}
                location={locationForecast.locationName}
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