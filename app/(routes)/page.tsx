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
                    {header: "search", labelColor:"black", items: [
                            <DateTime key="0"/>,
                            <LocationInfo key="1" />]},
                    {header: "weather", labelColor:"black", items:[
                            <div key="0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed ante sit amet lectus rhoncus viverra. Integer bibendum ultrices velit id elementum. Curabitur mattis ex tempor sodales tempor. Curabitur hendrerit purus id rhoncus suscipit. Proin ornare porttitor tincidunt. Proin cursus, orci vitae vehicula ultrices, dui neque interdum dolor, eu egestas elit lacus a nunc. In rutrum lectus at mauris suscipit dictum.

                                Curabitur dictum molestie eros, nec vestibulum ligula mollis quis. Sed sem tortor, varius vitae imperdiet sit amet, lacinia sit amet velit. Sed vestibulum accumsan gravida. Sed at tortor ultrices ex vestibulum tristique. Sed vulputate convallis nunc, ut posuere ligula tempor eu. Suspendisse lectus dui, lacinia at eleifend eget, mattis nec ipsum. Praesent malesuada tempus augue quis suscipit. Nam nec urna elit. Integer sit amet purus eu mi lacinia elementum et vel nisi. Maecenas sit amet ante consequat, rutrum tellus nec, sagittis ante. Phasellus id tellus sed neque euismod tempus. Pellentesque at lacinia augue. In et purus egestas, posuere turpis pellentesque, pharetra justo. Nulla hendrerit est nec ex aliquet molestie pulvinar vel lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

                                Maecenas commodo sem eros, sed dictum nibh mattis nec. Quisque arcu nibh, rhoncus et feugiat id, tempus in dolor. Suspendisse nisl orci, interdum quis erat sed, eleifend ullamcorper nisl. Suspendisse eget euismod nunc. In hac habitasse platea dictumst. Aenean et dictum ipsum. Nulla sit amet feugiat sapien. Proin consequat, sem vitae laoreet bibendum, justo velit bibendum dui, ac interdum urna ipsum vel tortor. Vivamus rutrum turpis eu odio maximus, eget feugiat quam congue. Mauris feugiat purus auctor massa efficitur venenatis. Cras id aliquam eros. Nam sagittis ultricies augue ac egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean non rutrum lacus. Vestibulum magna nulla, elementum a semper id, mollis sit amet justo.

                                Nulla diam diam, maximus eget ipsum at, molestie luctus metus. Sed bibendum vel turpis ac dictum. Maecenas a mauris elementum, faucibus massa quis, molestie neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula est nunc, at eleifend felis suscipit ut. Cras finibus odio sed euismod congue. Sed vel risus luctus nisi interdum tristique. Suspendisse potenti.

                                Nam euismod fringilla ultrices. Suspendisse fringilla orci ut luctus hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam vitae dui arcu. Nullam auctor, justo ut suscipit condimentum, nibh ipsum auctor leo, eget tincidunt nibh ex eget erat. Curabitur porta tortor porttitor, maximus nibh viverra, rutrum erat. Sed blandit augue vehicula, tempus eros eget, convallis nisi.
                            </div>,
                        ]},
                    {header: "places", labelColor:"black"},
                ]} />
      </main>
    </Provider>
}
