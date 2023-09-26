import React from "react";
import {GoogleMap, TrafficLayer, TransitLayer, useJsApiLoader} from "@react-google-maps/api";
import {Library} from "@googlemaps/js-api-loader";
import CurrentLocation from "@/app/_models/location";

const libraries: Library[] = ["places", "streetView", "core", "journeySharing"]

const Map = React.memo((
    props : {currentLocation: CurrentLocation}
    , context)=>{
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
      </GoogleMap>) : <></>;
});

Map.displayName = "Map";

export default Map;