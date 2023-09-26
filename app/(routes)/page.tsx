'use client'
import {useState, useEffect} from "react";
import Map from "@/app/_components/map"
import CurrentLocation from "@/app/_models/location";
import SearchCard from "@/app/_components/searchCard";

export default function Home() {
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
                <Map currentLocation={currentLocation}/>
                <SearchCard />
      </main>
}
