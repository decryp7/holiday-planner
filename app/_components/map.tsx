import React, {useEffect, useRef, useState} from "react";
import GoogleMap from "google-maps-react-markers";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {LocationForecast, TemperatureForecastInfo, WeatherForecastInfo} from "@/app/_models/weather";
import {plainToClass, plainToInstance} from "class-transformer";
import WeatherMarker from "@/app/_components/weatherMarker";
import {DateTime} from "luxon";
import CrossMarker from "@/app/_components/crossMarker";
import PlaceMarker from "@/app/_components/placeMarker";
import {Place} from "@/app/_models/place";
import {markLocationState} from "@/app/_state/markLocationState";
import {showWeatherState} from "@/app/_state/showWeatherState";
import TrafficLayer = google.maps.TrafficLayer;
import {showTrafficState} from "@/app/_state/showTrafficState";
import {showMyLocationState} from "@/app/_state/showMyLocationState";
import {myLocationState} from "@/app/_state/myLocationState";
import DotMarker from "@/app/_components/dotMarker";
import {goToLocationState} from "@/app/_state/goToLocationState";

const Map = React.memo((
    props : {}
    , context)=>{

    const [myLocation] = useRecoilState(myLocationState);
    const [locationForecasts, setLocationForecast] = useState<LocationForecast[]>([]);
    const [places, setPlaces] = useState<Place[]>([]);
    const mapRef = useRef<google.maps.Map | null>(null)
    const [mapReady, setMapReady] = useState(false)
    const placeMarkers = useRef<Record<string, React.Ref<any>>>({});
    const markLocation = useRecoilValue(markLocationState);
    const showWeather = useRecoilValue(showWeatherState);
    const trafficLayer = useRef<TrafficLayer>();
    const showTraffic = useRecoilValue(showTrafficState);
    const showMyLocation = useRecoilValue(showMyLocationState);
    const goToLocation = useRecoilValue(goToLocationState);

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
        if(mapRef.current === null || goToLocation === undefined) {
            return;
        }

        let zoom = mapRef.current.getZoom();
        if(zoom === undefined){
            return;
        }

        if(zoom < 14) {
            mapRef.current.setZoom(14);
            zoom = 14;
        }

        const projection = mapRef.current.getProjection();
        if(projection === undefined){
            return;
        }

        const scale = Math.pow(2, zoom);

        const locationPoint = projection.fromLatLngToPoint({lat: goToLocation.lat, lng: goToLocation.lng});
        if(locationPoint === null){
            return;
        }

        const adjustedLocationPoint = projection.fromPointToLatLng(
            new google.maps.Point(locationPoint.x, locationPoint.y + (200/scale)))
        if(adjustedLocationPoint === null){
            return;
        }

        mapRef.current.panTo(adjustedLocationPoint);

    }, [goToLocation]);

    useEffect(() => {
        if(trafficLayer.current === undefined ||
        mapRef.current === null){
            return;
        }

        if(showTraffic) {
            trafficLayer.current.setMap(mapRef.current);
        }else{
            trafficLayer.current?.setMap(null);
        }

    }, [showTraffic]);

    const onGoogleApiLoaded = ({ map, maps } : {map: google.maps.Map, maps: google.maps.MapsLibrary}) => {
        mapRef.current = map;
        setMapReady(true);
        map.setCenter({lat: 25.0330, lng: 121.5654});

        trafficLayer.current = new google.maps.TrafficLayer();
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
        {locationForecasts !== undefined &&
            showWeather &&
            locationForecasts.map((locationForecast, index) => {
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

        {showMyLocation !== undefined &&
            showMyLocation &&
            myLocation !== undefined &&
            <DotMarker lat={myLocation.lat} lng={myLocation.lng} />}
    </GoogleMap>;
});

Map.displayName = "Map";

export default Map;