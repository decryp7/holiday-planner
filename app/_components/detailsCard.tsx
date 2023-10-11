import React, {Fragment, Suspense, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {selectedMarkerState} from "@/app/_state/selectedMarkerState";
import {Place, Weekday} from "@/app/_models/place";
import {Badge, Card, Divider, Italic, Subtitle, Text, Title} from "@tremor/react";
import {plainToInstance} from "class-transformer";
import {DateTime} from "luxon";
import LoadingSkeleton from "@/app/_components/loadingSkeleton";
import PhotoCarousel from "@/app/_components/photoCarousel";
import useSWR from "swr";
import {fetcher} from "@/app/_libraries/constants";
import ErrorSkeleton from "@/app/_components/errorSkeleton";

const DetailsCard = React.memo((props : {} , context) =>{
    const [mounted, setMounted] = useState(false);
    const selectedMarker = useRecoilValue(selectedMarkerState);
    const {data, error, isLoading} =
        useSWR(mounted ? `/api/places/details?name=${selectedMarker}` : null
        , fetcher);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (error) return <ErrorSkeleton message={`Failed to find information for ${selectedMarker}.`} />
    if (isLoading) return <LoadingSkeleton />

    if(data === undefined){
        return <></>
    }

    const places = plainToInstance(Place, data);
    if(places.length < 1 || places[0] === undefined){
        return;
    }
    const place = places[0];
    const weekday = DateTime.now().weekday;

    return <div className="w-full">
        <div className="flex flex-col space-y-2 w-full h-full">
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
        </div>
    </div>
});

DetailsCard.displayName = "DetailsCard";

export default DetailsCard;