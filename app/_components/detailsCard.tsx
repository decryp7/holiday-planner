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
            return <>{placePhotoPaths.map((p, index) => <Image
                key={index}
                alt={details!.name}
                src={p}
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto rounded-xl grayscale"/>)}
            </>
        }

        return <></>
    }

    return <div className="flex flex-col">
        <Photos />
        <pre className="whitespace-pre-wrap">{JSON.stringify(details, null, 2)}</pre></div>
});

DetailsCard.displayName = "DetailsCard";

export default DetailsCard;