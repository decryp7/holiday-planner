import React, {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {activeCardState} from "@/app/_state/activeCardState";
import {selectedMarkerState} from "@/app/_state/selectedMarkerState";
import {PlaceData} from "@/app/_models/place";
import Image from "next/image";

const DetailsCard = React.memo((props : {} , context) =>{
    const [activeCard, setActiveCard] = useRecoilState(activeCardState);
    const selectedMarker = useRecoilValue(selectedMarkerState);
    const [details, setDetails] = useState<PlaceData>();
    const [imgPath, setImgPath] = useState<string>();

    useEffect(() => {
        if(selectedMarker != undefined) {
            setActiveCard("details");

            console.log(selectedMarker);
            const url = `/api/places/name?${selectedMarker}`;
            fetch(url)
                .then(async res => await res.json() as PlaceData[])
                .then(pd => {
                    if(pd.length < 1){
                        console.log(`Cannot find any data for ${selectedMarker}`);
                        return;
                    }
                    setImgPath(`/place-img/${pd[0].gplaceid}.jpg`);
                    setDetails(pd[0]);
                });
        }
    }, [selectedMarker]);

    return <div className="flex flex-col">
        { imgPath != undefined  && details != undefined &&
            <Image
                alt={details!.name}
                src={imgPath}
                width="0"
                height="0"
                sizes="100vw"
                className="w-fit h-auto"/>
        }
        <div>{JSON.stringify(details)}</div></div>
});

DetailsCard.displayName = "DetailsCard";

export default DetailsCard;