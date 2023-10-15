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
import DateTimeWidget from "@/app/_components/dateTimeWidget";
import SearchCard from "@/app/_components/searchCard";
import ToggleWeatherButton from "@/app/_components/toggleWeatherButton";
import ToggleTrafficButton from "@/app/_components/toggleTrafficButton";
import ToggleMyLocationButton from "@/app/_components/toggleMyLocationButton";
import GoToMyLocationButton from "@/app/_components/goToMyLocationButton";

export default function Home() {
    return <RecoilRoot>
    <main className={`w-full h-screen`}>
                <Map />

                <SideTray>
                    <DateTimeWidget />
                    <ToggleMyLocationButton />
                    <GoToMyLocationButton />
                    <ToggleCardsButton />
                    <ToggleWeatherButton />
                    <ToggleTrafficButton />
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
