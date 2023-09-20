'use client'
import {useState, useEffect} from "react";

interface LocationData {
    latitude: number;
    longitude: number;
}

declare type CurrentLocation = LocationData | undefined;

export default function Home() {
    const [currentLocation, setCurrentLocation] = useState<CurrentLocation>(undefined);

    useEffect(() => {
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setCurrentLocation({latitude, longitude});
            }, error =>{
                alert(error.message);
            })
        }else{
            alert("geolocation not supported!");
        }
    }, []);

    return (
      <main className="columns-2xs p-2">
        <div className="min-w-fit w-fit border-2 p-2">
          <label>Search: </label><input width="200px" />
        </div>
        <div className="w-fit border-2 p-2">{currentLocation !== undefined ? JSON.stringify(currentLocation) : "Unknown"}</div>
      </main>
  )
}
