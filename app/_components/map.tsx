import React, {useState} from "react";
import {MarkerF, GoogleMap, TrafficLayer, TransitLayer, useJsApiLoader} from "@react-google-maps/api";
import {Library} from "@googlemaps/js-api-loader";
import CurrentLocation from "@/app/_models/location";
import {useAppSelector} from "@/app/hooks";

const Map = React.memo((
    props : {}
    , context)=>{

    const [ libraries ] = useState<Library[]>(["places", "streetView", "core", "journeySharing"]);
   const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
      libraries: libraries
   })
    const {location} = useAppSelector((state)=> state.location);

    return isLoaded ? (<GoogleMap
          mapContainerStyle={{width: '100%', height: '100%'}}
          center={location !== undefined ? location : { lat:0, lng: 0 }}
          zoom={location !== undefined ? 14 : 3}>
         <TrafficLayer/>
         <TransitLayer/>
       {location !== undefined ?
           <MarkerF icon={{
               path:
                   "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
               fillColor: "yellow",
               fillOpacity: 0.9,
               scale: 2,
               strokeColor: "gold",
               strokeWeight: 2,
           }} position={location}/>
           : <></>}
      </GoogleMap>) : <></>;
});

Map.displayName = "Map";

export default Map;