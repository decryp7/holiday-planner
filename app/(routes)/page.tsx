'use client'
import React from "react";
import Map from "@/app/_components/map"
import dynamic from 'next/dynamic'
import CardGroup from "@/app/_components/cardGroup";
import {RecoilRoot} from "recoil";
import WeatherCard from "@/app/_components/weatherCard";
import DetailsCard from "@/app/_components/detailsCard";
import SideTray from "@/app/_components/sideTray";
import ToggleCardsButton from "@/app/_components/toggleCardsButton";
import DateTime from "@/app/_components/dateTime";
import SearchCard from "@/app/_components/searchCard";

export default function Home() {
    return <RecoilRoot>
    <main className={`w-full h-screen`}>
                <Map />

                <SideTray>
                    <DateTime />
                    <ToggleCardsButton />
                </SideTray>

                <CardGroup cards={[
                    {header: "search", labelColor:"rgb(31 41 55)", content:
                            <SearchCard key={0} /> },
                    {header: "weather", labelColor:"rgb(31 41 55)", content:
                             <WeatherCard key={0} /> },
                    {header: "details", labelColor:"rgb(31 41 55)", content:
                             <DetailsCard key={0} /> },
                ]} />
      </main>
    </RecoilRoot>
}
