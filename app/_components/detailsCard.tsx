import React, {Fragment, Suspense, useEffect, useRef, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {activeCardState} from "@/app/_state/activeCardState";
import {selectedMarkerState} from "@/app/_state/selectedMarkerState";
import {Place, PlaceData, Weekday} from "@/app/_models/place";
import Image from "next/image";
import {Badge, Divider, Title, Text, Metric, Card, Subtitle, Italic} from "@tremor/react";
import {plainToClass, plainToInstance} from "class-transformer";
import {DateTime} from "luxon";
import LoadingSkeleton from "@/app/_components/loadingSkeleton";

const DetailsCard = React.memo((props : {} , context) =>{
    const [activeCard, setActiveCard] = useRecoilState(activeCardState);
    const [selectedMarker, setSelectedMarker] = useRecoilState(selectedMarkerState);
    //const [details, setDetails] = useState<PlaceData>();
    //const [placePhotoPaths, setPlacePhotoPaths] = useState<string[]>();
    let placePhotos: string[] = [];
    let place: Place;

    useEffect(() => {
        if(selectedMarker === undefined){
            return;
        }
        setActiveCard("details");
    }, [selectedMarker]);

    useEffect(() => {
        if(activeCard != "details"){
            setSelectedMarker(undefined);
        }
    }, [activeCard]);

    function Photos(){
        if(placePhotos != undefined  && place != undefined){
            return <div className="flex h-full">
                        <div className="flex flex-row overflow-auto snap-x snap-mandatory">
                        {placePhotos.map((p, index) =>
                            <Image
                                key={index}
                                alt={place.name}
                                src={p}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="w-auto h-full snap-center saturate-200"/>
                                )}
                        </div>
                </div>
        }
        return <></>
    }

    async function Details(){
        if(selectedMarker == null){
            return <></>;
        }

        let url = `/api/places/name?${selectedMarker}`;
        const places = await fetch(url)
            .then(async res => plainToInstance(Place, await res.json()));
        if(places.length < 1){
            return <></>;
        }
        place = places[0];

        url = `/api/places/photos?${place.gplaceid}`;
        placePhotos = await fetch(url)
            .then(async res => JSON.parse(await res.json())) as string[];

        const openingHours = place.getOpeningHours();
        const weekday = DateTime.now().weekday;

        return <div className="flex flex-col space-y-2 w-full">
            <div className="flex flex-row space-x-2">
                <Title className="text-2xl">{place.name}</Title>
                <Badge color={place.IsOpen() ? "green" : "red"}>{place.IsOpen() ? "Open" : "Closed"}</Badge>
            </div>
            <Text><Italic>{place.address}</Italic></Text>
            <div className="flex flex-row flex-wrap gap-2">
                {place.tags.map((tag, index) =>
                    <Badge key={index}>{tag.toString()}</Badge>
                )}
            </div>
            <Divider />
            {place.description === undefined ? <></> :
                <Text>{place.description}</Text>}
            <Photos/>
            <Card className="bg-gray-50">
                <Title className="px-2">Opening Hours</Title>
                <div className="flex flex-row flex-wrap gap-2">
                    {openingHours.map((oh, index) =>
                        <div key={index}>
                            <Subtitle
                                className={`w-fit px-2 ${+Weekday[oh.weekday as keyof typeof Weekday]=== weekday ? "text-gray-800 bg-yellow-300" : ""}`}>{oh.weekday}</Subtitle>
                            <Text
                                className={`w-fit px-2 ${+Weekday[oh.weekday as keyof typeof Weekday]=== weekday ? "text-gray-800 bg-yellow-300" : ""}`}>{oh.time}</Text>
                        </div>)}
                </div>
            </Card>
        </div>;
    }

    return <div className="w-full">
        <Suspense fallback={<LoadingSkeleton/>}>
            <Details />
        </Suspense>
    </div>
});

DetailsCard.displayName = "DetailsCard";

export default DetailsCard;