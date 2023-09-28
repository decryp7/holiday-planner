import React, {useState} from "react";
import {MarkerF, GoogleMap, TrafficLayer, TransitLayer, useJsApiLoader} from "@react-google-maps/api";
import {Library} from "@googlemaps/js-api-loader";
import {useRecoilState} from "recoil";
import {currentLocationState} from "@/app/_state/currentLocationState";

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
           }} position={location}/>
           : <></>}
      </GoogleMap>) : <></>;
});

Map.displayName = "Map";

export default Map;