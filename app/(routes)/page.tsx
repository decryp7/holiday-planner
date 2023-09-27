'use client'
import {useState, useEffect} from "react";
import Map from "@/app/_components/map"
import CurrentLocation from "@/app/_models/location";
import Card from "@/app/_components/card";
import LocationInfo from "@/app/_components/locationInfo";
import dynamic from 'next/dynamic'
import CardGroup from "@/app/_components/cardGroup";

const DateTime = dynamic(() => import('@/app/_components/dateTime'), { ssr: false })

export default function Home() {
    const [currentLocation, setCurrentLocation] = useState<CurrentLocation>(undefined);

    function handleLocationChanged(location:CurrentLocation){
        setCurrentLocation(location);
    }

    return <main className={`w-full h-screen`}>
                <Map currentLocation={currentLocation}/>
                <CardGroup>
                        <Card header="places" headerSize={60} labelColor="black">
                            <></>
                        </Card>
                        <Card header="weather" headerSize={40} labelColor="black">
                            <></>
                        </Card>
                        <Card header="search" headerSize={20} labelColor="black">
                            <DateTime/>
                            <LocationInfo onLocationChanged={handleLocationChanged}/>
                        </Card>
                </CardGroup>
      </main>
}
