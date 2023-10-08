import React, {Fragment, Suspense, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {selectedMarkerState} from "@/app/_state/selectedMarkerState";
import {Place, Weekday} from "@/app/_models/place";
import {Badge, Card, Divider, Italic, Subtitle, Text, Title} from "@tremor/react";
import {plainToInstance} from "class-transformer";
import {DateTime} from "luxon";
import LoadingSkeleton from "@/app/_components/loadingSkeleton";
import PhotoCarousel from "@/app/_components/photoCarousel";

async function Details(props: {placeName: string}){
    const [place, setPlace] = useState<Place>();

    async function fetchDetails(){
        const url = `/api/places/name?${props.placeName}`;
        const places = await fetch(url)
            .then(async res => plainToInstance(Place, await res.json()));
        if(places.length < 1 || places[0] === undefined){
            return;
        }
        const place = places[0];
        setPlace(place);
    }

    useEffect(() => {
        fetchDetails()
            .catch((e: any) =>{
                console.log(`Error occurred when fetching details for ${props.placeName}. Error: ${e}`);
            });
    }, [props.placeName]);

    if(props.placeName === undefined){
        return <></>;
    }

    const weekday = DateTime.now().weekday;

    return <Fragment>{place != undefined && <div className="flex flex-col space-y-2 w-full h-full">
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
        <Divider/>
        {place.description === undefined ? <></> :
            <Text>{place.description}</Text>}
        <PhotoCarousel placeName={place.name} placeId={place.gplaceid}/>
        <Card className="bg-gray-50 p-3">
            <Title className="px-2">Opening Hours</Title>
            <div className="flex flex-row flex-wrap gap-2">
                {place.getOpeningHours().map((oh, index) =>
                    <div key={index}>
                        <Subtitle
                            className={`w-fit px-2 ${+Weekday[oh.weekday as keyof typeof Weekday] === weekday ? "text-gray-800 bg-yellow-300" : ""}`}>{oh.weekday}</Subtitle>
                        <Text
                            className={`w-fit px-2 ${+Weekday[oh.weekday as keyof typeof Weekday] === weekday ? "text-gray-800 bg-yellow-300" : ""}`}>{oh.time}</Text>
                    </div>)}
            </div>
        </Card>
    </div>}</Fragment>;
}

const DetailsCard = React.memo((props : {} , context) =>{
    const selectedMarker = useRecoilValue(selectedMarkerState);

    return <div className="w-full">
        <Suspense fallback={<LoadingSkeleton/>}>
            {selectedMarker !== undefined && <Details placeName={selectedMarker} />}
        </Suspense>
    </div>
});

DetailsCard.displayName = "DetailsCard";

export default DetailsCard;