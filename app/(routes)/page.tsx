'use client'
import {useState, useEffect} from "react";
import Map from "@/app/_components/map"
import CurrentLocation from "@/app/_models/location";

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
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
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
