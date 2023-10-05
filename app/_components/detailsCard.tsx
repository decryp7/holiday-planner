import React, {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {activeCardState} from "@/app/_state/activeCardState";
import {selectedMarkerState} from "@/app/_state/selectedMarkerState";
import {Place, PlaceData} from "@/app/_models/place";
import Image from "next/image";
import { Badge } from "@tremor/react";
import {plainToClass, plainToInstance} from "class-transformer";

const DetailsCard = React.memo((props : {} , context) =>{
    const [activeCard, setActiveCard] = useRecoilState(activeCardState);
    const [selectedMarker, setSelectedMarker] = useRecoilState(selectedMarkerState);
    const [details, setDetails] = useState<PlaceData>();
    const [imgPath, setImgPath] = useState<string>();

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
                setImgPath(`/place-img/${pd[0].gplaceid}.jpg`);
                setDetails(pd[0]);
            });
    }, [selectedMarker]);

    useEffect(() => {
        if(activeCard != "details"){
            setSelectedMarker(undefined);
        }
    }, [activeCard]);

    return <div className="flex flex-col">
        { imgPath != undefined  && details != undefined &&
            <Image
                alt={details!.name}
                src={imgPath}
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto rounded"/>
        }
        <div className="h-fit">{JSON.stringify(details)}</div></div>
});

DetailsCard.displayName = "DetailsCard";

export default DetailsCard;