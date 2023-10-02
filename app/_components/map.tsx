import React, {useEffect, useState} from "react";
import {
    MarkerF,
    GoogleMap,
    TrafficLayer,
    TransitLayer,
    useJsApiLoader,
    InfoWindow,
    OverlayView
} from "@react-google-maps/api";
import {Library} from "@googlemaps/js-api-loader";
import {useRecoilState} from "recoil";
import {currentLocationState} from "@/app/_state/currentLocationState";
import {LocationForecast, TemperatureForecastInfo, WeatherForecast, WeatherForecastInfo} from "@/app/_models/weather";
import getWeatherForecast from "@/app/_libraries/weather";
import Image from "next/image";
import {plainToClass, plainToInstance} from "class-transformer";
import WeatherMarker from "@/app/_components/weatherMarker";

const Map = React.memo((
    props : {}
    , context)=>{

    const [ libraries ] = useState<Library[]>(["places", "streetView", "core", "journeySharing"]);
   const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
      libraries: libraries
   })
    const [location] = useRecoilState(currentLocationState);
   const [locationForecasts, setLocationForecast] = useState<LocationForecast[]>([]);

    useEffect(() => {
        fetch(`/api/weather/${new Date().getTime()}`)
            .then(res => res.json())
            .then(setLocationForecast);
    }, []);

    return isLoaded ? (<GoogleMap
          mapContainerStyle={{width: '100%', height: '100%'}}
          center={location !== undefined ? location : { lat:0, lng: 0 }}
          zoom={location !== undefined ? 14 : 3}>
         <TrafficLayer/>
         <TransitLayer/>
       {location !== undefined ?
               <MarkerF icon={{
               path:
                   "M6 18L18 6M6 6l12 12",
               scale: 2,
               strokeColor: "Crimson",
               strokeWeight: 8,
               }} position={location}>
               </MarkerF>
           : <></>}
        {locationForecasts.map((locationForecast, index) => {
            const weatherForecastInfo = locationForecast.forecast[0] as WeatherForecastInfo;
            const temperatureForecastInfo = plainToClass(TemperatureForecastInfo, locationForecast.forecast[1]);
            return <OverlayView
                key={index}
                position={{lat: locationForecast.lat, lng: locationForecast.lng}}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                <WeatherMarker icon={weatherForecastInfo.icon} value={weatherForecastInfo.value} temperature={temperatureForecastInfo.toString()} />
            </OverlayView>
        })}
      </GoogleMap>) : <></>;
});

Map.displayName = "Map";

export default Map;