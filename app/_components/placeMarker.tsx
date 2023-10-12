import React, {useEffect, useState} from "react";
import {BsFillCircleFill} from "react-icons/bs";
import {Place} from "@/app/_models/place";
import {useRecoilState, useSetRecoilState} from "recoil";
import {currentUnixTimeState} from "@/app/_state/currentUnixTimeState";
import {selectedMarkerState} from "@/app/_state/selectedMarkerState";
import {activeCardState} from "@/app/_state/activeCardState";

const PlaceMarker = React.memo((props : {
    lat: number,
    lng: number,
    place: Place,
} , context) =>{
    const currentUnixTime = useRecoilState(currentUnixTimeState);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const setSelectedMarker = useSetRecoilState(selectedMarkerState);
    const [activeCard, setActiveCard] = useRecoilState(activeCardState);

    useEffect(() => {
        setIsOpen(props.place.IsOpen());
    }, [currentUnixTime]);

    function handleClick(){
        setActiveCard("details");
        setSelectedMarker(props.place.name);
    }

    return <div data-place-name={props.place.name}
                onClick={handleClick}
                className={`${props.place.tags.indexOf('food') > -1 ? "bg-blue-300" : "bg-yellow-300"} ` +
                    `flex flex-row p-1 w-fit text-[1em] break-keep whitespace-nowrap text-gray-800 font-bold bg-opacity-80 hover:cursor-pointer`}>
        <div className="flex">
            <BsFillCircleFill className={`${isOpen ? "text-green-500" : "text-red-500"} w-4 h-fit m-auto p-1`} />
        </div>
        <div className="m-auto">
            {props.place.name}
        </div>
    </div>
});

PlaceMarker.displayName = "PlaceMarker";

export default PlaceMarker;