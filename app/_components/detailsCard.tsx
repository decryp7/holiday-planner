import React, {Fragment, Suspense, useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {selectedMarkerState} from "@/app/_state/selectedMarkerState";
import {Place, Weekday} from "@/app/_models/place";
import {plainToInstance} from "class-transformer";
import {DateTime} from "luxon";
import LoadingSkeleton from "@/app/_components/loadingSkeleton";
import useSWR from "swr";
import {fetcher} from "@/app/_libraries/constants";
import ErrorSkeleton from "@/app/_components/errorSkeleton";
import PlaceDetailPanel from "@/app/_components/placeDetailPanel";

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

    return <div className="w-full h-full">
        <PlaceDetailPanel className="w-full" place={place}/>
    </div>
});

DetailsCard.displayName = "DetailsCard";

export default DetailsCard;