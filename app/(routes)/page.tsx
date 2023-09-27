'use client'
import React, {useState, useEffect} from "react";
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
                <CardGroup cards={[
                    {header: "places", headerSize: 60, labelColor:"black"},
                    {header: "weather", headerSize: 40, labelColor:"black"},
                    {header: "search", headerSize: 20, labelColor:"black", items: [
                            <DateTime key="0"/>,
                            <LocationInfo key="1" onLocationChanged={handleLocationChanged}/>]}
                ]} />
      </main>
}
