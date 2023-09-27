'use client'
import React, {useState, useEffect} from "react";
import Map from "@/app/_components/map"
import CurrentLocation from "@/app/_models/location";
import Card from "@/app/_components/card";
import LocationInfo from "@/app/_components/locationInfo";
import dynamic from 'next/dynamic'
import CardGroup from "@/app/_components/cardGroup";
import {store} from "@/app/store";
import {Provider} from "react-redux";

const DateTime = dynamic(() => import('@/app/_components/dateTime'), { ssr: false })

export default function Home() {
    return <Provider store={store}>
    <main className={`w-full h-screen`}>
                <Map />
                <CardGroup cards={[
                    {header: "search", headerSize: 60, labelColor:"black", items: [
                            <DateTime key="0"/>,
                            <LocationInfo key="1" />]},
                    {header: "weather", headerSize: 40, labelColor:"black"},
                    {header: "places", headerSize: 20, labelColor:"black"},
                ]} />
      </main>
    </Provider>
}
