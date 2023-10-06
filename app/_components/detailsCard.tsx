import React, {Fragment, useEffect, useRef, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {activeCardState} from "@/app/_state/activeCardState";
import {selectedMarkerState} from "@/app/_state/selectedMarkerState";
import {Place, PlaceData, Weekday} from "@/app/_models/place";
import Image from "next/image";
import {Badge, Divider, Title, Text, Metric, Card, Subtitle, Italic} from "@tremor/react";
import {plainToClass, plainToInstance} from "class-transformer";
import {DateTime} from "luxon";

const DetailsCard = React.memo((props : {} , context) =>{
    const [activeCard, setActiveCard] = useRecoilState(activeCardState);
    const [selectedMarker, setSelectedMarker] = useRecoilState(selectedMarkerState);
    const [details, setDetails] = useState<PlaceData>();
    const [placePhotoPaths, setPlacePhotoPaths] = useState<string[]>();

    useEffect(() => {
        if(selectedMarker === undefined){
            return;
        }

        setActiveCard("details");

        const url = `/api/places/name?${selectedMarker}`;
        fetch(url)
            .then(async res => plainToInstance(Place, await res.json()))
            .then(pd => {
                if(pd.length < 1){
                    console.log(`Cannot find any data for ${selectedMarker}`);
                    return;
                }

                setDetails(pd[0]);
                return pd[0].gplaceid;
            })
            .then(p => {
                const url = `/api/places/photos?${p}`;
                fetch(url)
                    .then(async res => JSON.parse(await res.json()))
                    .then(r => {
                        setPlacePhotoPaths(r);
                    });
            });
    }, [selectedMarker]);

    useEffect(() => {
        if(activeCard != "details"){
            setSelectedMarker(undefined);
        }
    }, [activeCard]);

    function Photos(){
        if(placePhotoPaths != undefined  && details != undefined){
            return <div className="flex h-full">
                        <div className="flex flex-row overflow-auto snap-x snap-mandatory">
                        {placePhotoPaths.map((p, index) =>
                            <Image
                                key={index}
                                alt={details!.name}
                                src={p}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="w-fit h-full snap-center saturate-200"/>
                                )}
                        </div>
                </div>
        }

        return <></>
    }

    function Details(){
        if(details === undefined){
            return <></>;
        }

        const openingHours = details.getOpeningHours();
        const weekday = DateTime.now().weekday;

        return <div className="flex flex-col space-y-2 w-full">
            <div className="flex flex-row space-x-2">
                <Title className="text-2xl">{details.name}</Title>
                <Badge color={details.IsOpen() ? "green" : "red"}>{details.IsOpen() ? "Open" : "Closed"}</Badge>
            </div>
            <Text><Italic>{details.address}</Italic></Text>
            <Divider />
            {details.description === undefined ? <></> :
                <Text>{details.description}</Text>}
            <Photos/>
            <div className="flex flex-row flex-wrap gap-2">
            {details.tags.map((tag, index) =>
                <Badge key={index}>{tag.toString()}</Badge>
            )}
            </div>
            <Card className="bg-gray-50">
                <Title className="px-2">Opening Hours</Title>
                <div className="flex flex-col space-y-2">
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

    return <Details />
});

DetailsCard.displayName = "DetailsCard";

export default DetailsCard;