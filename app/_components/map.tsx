import React, {useEffect, useRef, useState} from "react";
import GoogleMap from "google-maps-react-markers";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {currentLocationState} from "@/app/_state/currentLocationState";
import {LocationForecast, TemperatureForecastInfo, WeatherForecastInfo} from "@/app/_models/weather";
import {plainToClass, plainToInstance} from "class-transformer";
import WeatherMarker from "@/app/_components/weatherMarker";
import {DateTime} from "luxon";
import CrossMarker from "@/app/_components/crossMarker";
import PlaceMarker from "@/app/_components/placeMarker";
import {Place} from "@/app/_models/place";
import {markLocationState} from "@/app/_state/markLocationState";

const Map = React.memo((
    props : {}
    , context)=>{

    const [location] = useRecoilState(currentLocationState);
    const [locationForecasts, setLocationForecast] = useState<LocationForecast[]>([]);
    const [places, setPlaces] = useState<Place[]>([]);
    const mapRef = useRef<google.maps.Map | null>(null)
    const [mapReady, setMapReady] = useState(false)
    const placeMarkers = useRef<Record<string, React.Ref<any>>>({});
    const markLocation = useRecoilValue(markLocationState);

    useEffect(() => {
        const url = `/api/weather?datetime=${DateTime.now().toUTC().toMillis()}`;
        fetch(url)
            .then(res => res.json())
            .then(setLocationForecast);
        fetch("/api/places")
            .then(res => res.json())
            .then(r => plainToInstance(Place, r))
            .then(p =>{ setPlaces(p)});
    }, [mapReady]);

    useEffect(() => {
        if(mapRef.current === null || markLocation === undefined) {
            return;
        }

        mapRef.current.setZoom(14);

        const projection = mapRef.current.getProjection();
        if(projection === undefined){
            return;
        }

        const zoom = mapRef.current.getZoom();
        if(zoom === undefined){
            return;
        }

        const scale = Math.pow(2, zoom);

        const locationPoint = projection.fromLatLngToPoint({lat: markLocation.lat, lng: markLocation.lng});
        if(locationPoint === null){
            return;
        }

        const adjustedLocationPoint = projection.fromPointToLatLng(
            new google.maps.Point(locationPoint.x, locationPoint.y + (200/scale)))
        if(adjustedLocationPoint === null){
            return;
        }

        mapRef.current.panTo(adjustedLocationPoint);

    }, [markLocation]);

    const onGoogleApiLoaded = ({ map, maps } : {map: google.maps.Map, maps: google.maps.MapsLibrary}) => {
        mapRef.current = map;
        setMapReady(true);
        map.setCenter({lat: 25.0330, lng: 121.5654});

        new google.maps.TrafficLayer({map: map});
    }

    function setRef(el: any){
        if(el != null) {
            placeMarkers.current[el.id] = el;
        }
    }

    return <GoogleMap
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                defaultCenter={{ lat: 0, lng: 0 }}
                defaultZoom={11}
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

        {places !== undefined && places.map((p, index)=> {
            return <PlaceMarker key={index} lat={p.lat} lng={p.lng} place={p} ref={setRef}/>
        })}

        {markLocation !== undefined && <CrossMarker lat={markLocation.lat} lng={markLocation.lng} />}

        {location !== undefined && <CrossMarker lat={location.lat} lng={location.lng} />}
    </GoogleMap>;
});

Map.displayName = "Map";

export default Map;