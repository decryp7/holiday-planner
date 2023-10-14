import React, {useEffect, useImperativeHandle, useState} from "react";
import {BsFillCircleFill} from "react-icons/bs";
import {Place} from "@/app/_models/place";
import {useRecoilState, useSetRecoilState} from "recoil";
import {currentUnixTimeState} from "@/app/_state/currentUnixTimeState";
import {selectedMarkerState} from "@/app/_state/selectedMarkerState";
import {activeCardState} from "@/app/_state/activeCardState";
import {LocationInfo} from "@/app/_models/location";

const PlaceMarker = React.memo(React.forwardRef((props : {
    lat: number,
    lng: number,
    place: Place,
} , ref) =>{
    const currentUnixTime = useRecoilState(currentUnixTimeState);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const setSelectedMarker = useSetRecoilState(selectedMarkerState);
    const [activeCard, setActiveCard] = useRecoilState(activeCardState);

    useImperativeHandle(ref, ()=>{
        return {
            get id() { return props.place.id },
            get location() { return new LocationInfo(props.lat, props.lng); },
            get name() { return props.place.name;},
        }
    });

    useEffect(() => {
        setIsOpen(props.place.IsOpen());
    }, [currentUnixTime]);

    function handleClick(event: React.MouseEvent<HTMLDivElement>){
        event.stopPropagation();
        setActiveCard("details");
        setSelectedMarker(props.place.name);
    }

    return <div data-place-name={props.place.name}
                onClick={handleClick}
                className={`${props.place.tags.indexOf('food') > -1 ? "bg-sky-300" : "bg-amber-300"} ` +
                    `flex flex-row drop-shadow p-1 w-fit text-[1em] break-keep whitespace-nowrap text-gray-800 font-bold bg-opacity-80 hover:cursor-pointer`}>
        <div className="flex">
            <BsFillCircleFill className={`${isOpen ? "text-green-600" : "text-red-600"} w-4 h-fit m-auto p-1`} />
        </div>
        <div className="m-auto">
            {props.place.name}
        </div>
    </div>
}));

PlaceMarker.displayName = "PlaceMarker";

export default PlaceMarker;