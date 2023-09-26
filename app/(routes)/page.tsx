'use client'
import {useState, useEffect} from "react";
import Map from "@/app/_components/map"
import CurrentLocation from "@/app/_models/location";
import Card from "@/app/_components/card";
import LocationInfo from "@/app/_components/locationInfo";
import dynamic from 'next/dynamic'

const DateTime = dynamic(() => import('@/app/_components/dateTime'), { ssr: false })

export default function Home() {
    const [currentLocation, setCurrentLocation] = useState<CurrentLocation>(undefined);

    function handleLocationChanged(location:CurrentLocation){
        console.log("location changed!")
        setCurrentLocation(location);
    }

    return <main className={`w-full h-screen`}>
                <Map currentLocation={currentLocation}/>
                <Card>
                    <DateTime/>
                    <LocationInfo onLocationChanged={handleLocationChanged}/>
                </Card>
      </main>
}
