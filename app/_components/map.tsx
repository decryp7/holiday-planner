import React from "react";
import {MarkerF, GoogleMap, TrafficLayer, TransitLayer, useJsApiLoader} from "@react-google-maps/api";
import {Library} from "@googlemaps/js-api-loader";
import CurrentLocation from "@/app/_models/location";
import MapMarker from "@/app/_components/mapMarker";

const Map = React.memo((
    props : {currentLocation: CurrentLocation}
    , context)=>{

    const libraries: Library[] = ["places", "streetView", "core", "journeySharing"]
   const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
      libraries: libraries
   })

    return isLoaded ? (<GoogleMap
          mapContainerStyle={{width: '100%', height: '100%'}}
          center={props.currentLocation !== undefined ? props.currentLocation : { lat:0, lng: 0 }}
          zoom={props.currentLocation !== undefined ? 14 : 3}>
         <TrafficLayer/>
         <TransitLayer/>
       {props.currentLocation !== undefined ?
           <MarkerF icon={{
               path:
                   "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
               fillColor: "yellow",
               fillOpacity: 0.9,
               scale: 2,
               strokeColor: "gold",
               strokeWeight: 2,
           }} position={props.currentLocation}/>
           : <></>}
      </GoogleMap>) : <></>;
});

Map.displayName = "Map";

export default Map;