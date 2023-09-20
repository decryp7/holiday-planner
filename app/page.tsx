'use client'
import {useState, useEffect} from "react";
import GoogleMapReact from 'google-map-react';

interface LocationData {
    lat: number;
    lng: number;
}

declare type CurrentLocation = LocationData | undefined;

export default function Home() {
    const [currentLocation, setCurrentLocation] = useState<CurrentLocation>(undefined);

    useEffect(() => {
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setCurrentLocation({lat:latitude, lng:longitude});
            }, error =>{
                alert(error.message);
            })
        }else{
            alert("geolocation not supported!");
        }
    }, []);

    return (
      <main className="flex md:flex-row flex-col">
        <div className="min-w-max w-fit flex-nowrap p-2">
          <label>Search: </label><input width="200px" />
        </div>
        <div className="w-full h-screen p-2">
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string, language:'en' }}
                defaultCenter={{lat: 25.0329636, lng: 121.5654268}}
                center={currentLocation}
                defaultZoom={11}
            >
            </GoogleMapReact>
        </div>
      </main>
  )
}
