'use client'
import {useState, useEffect} from "react";
import GoogleMapReact from 'google-map-react';
import {Client, LatLngLiteral} from "@googlemaps/google-maps-services-js";

interface LocationData {
    lat: number;
    lng: number;
}

declare type CurrentLocation = LocationData | undefined;

export default function Home() {
    const [currentLocation, setCurrentLocation] = useState<CurrentLocation>(undefined);
    const [defaultCenter, setDefaultCenter] = useState<CurrentLocation>(undefined);

    useEffect(() => {
        const client = new Client({});
        (async ()=>{
            const res = await client.geocode({params: {key:process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string, address: "Taipei"}});

            if(res.status === 200 && res.data && res.data.results) {
                const latLngLiteral: LatLngLiteral = res.data.results[0].geometry.location;
                setDefaultCenter({lat: latLngLiteral.lat, lng: latLngLiteral.lng});
            }
        })();

        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setCurrentLocation({lat:latitude, lng:longitude});
            }, error =>{
                alert(error.message);
            })
        }else{
            alert("geolocation not supported!");
        }
    }, []);

    return <main className="flex md:flex-row flex-col">
        <div className="min-w-max w-fit flex-nowrap p-2">
          <label>Search: </label><input width="200px" />
        </div>
        <div className="w-full h-screen p-2">
            {defaultCenter ?
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string, language:'en' }}
                defaultCenter={defaultCenter}
                center={currentLocation}
                defaultZoom={11}
            >
            </GoogleMapReact>
            : <h2>Loading...</h2>}
        </div>
      </main>
}
