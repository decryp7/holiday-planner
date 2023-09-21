'use client'
import {useState, useEffect} from "react";
import { GoogleMap, useJsApiLoader, TrafficLayer, TransitLayer, KmlLayer } from '@react-google-maps/api';
import {Library} from "@googlemaps/js-api-loader";

interface LocationData {
    lat: number;
    lng: number;
}

declare type CurrentLocation = LocationData | undefined;
const libraries: Library[] = ["places", "streetView", "core", "journeySharing"]

export default function Home() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        libraries: libraries
    })

    const kmlURL = "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1m2ouMpaefFlRqXtfxHMSUHfTp1Wbkps";
    const [currentLocation, setCurrentLocation] = useState<CurrentLocation>(undefined);

    useEffect(() => {
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setCurrentLocation({lat:latitude, lng:longitude});
                console.log("Got current user position!");
            }, error =>{
                console.log(`Unable to get user's location. ${error}`);
                alert("Unable to get your current location.");
            })
        }else{
            alert("geolocation not supported!");
        }
    }, []);

    return <main className={`w-full h-screen`}>
                {isLoaded ? (<GoogleMap
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    center={currentLocation !== undefined ? currentLocation : { lat:0, lng: 0 }}
                    zoom={currentLocation !== undefined ? 14 : 3}>
                    <TrafficLayer/>
                    <TransitLayer/>
                    <KmlLayer url={kmlURL} options={{preserveViewport:true}}/>
                </GoogleMap>) : <></>}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                    <div className="mt-2">
                        <input
                            type="search"
                            name="search"
                            id="search"
                            className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Search here"
                        />
                    </div>
                </div>
      </main>
}
