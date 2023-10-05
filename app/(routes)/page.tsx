'use client'
import React, {useState, useEffect} from "react";
import Map from "@/app/_components/map"
import LocationInfo from "@/app/_components/locationInfo";
import dynamic from 'next/dynamic'
import CardGroup from "@/app/_components/cardGroup";
import {RecoilRoot} from "recoil";
import WeatherCard from "@/app/_components/weatherCard";
import DetailsCard from "@/app/_components/detailsCard";
import SideTray from "@/app/_components/sideTray";
import ToggleCardsButton from "@/app/_components/toggleCardsButton";

const DateTime = dynamic(() => import('@/app/_components/dateTime'), { ssr: false })

export default function Home() {
    return <RecoilRoot>
    <main className={`w-full h-screen`}>
                <Map />

                <SideTray>
                    <DateTime />
                    <ToggleCardsButton />
                </SideTray>

                <CardGroup cards={[
                    {header: "search", labelColor:"rgb(31 41 55)"},
                    {header: "weather", labelColor:"rgb(31 41 55)", items:[
                            <WeatherCard key={0} />
                        ]},
                    {header: "details", labelColor:"rgb(31 41 55)", items:[
                            <DetailsCard key={0} />
                        ]},
                ]} />
      </main>
    </RecoilRoot>
}
