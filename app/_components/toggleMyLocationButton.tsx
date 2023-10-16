import React, {useEffect, useRef} from "react";
import {useRecoilState, useSetRecoilState} from "recoil";
import {TbCurrentLocation} from "react-icons/tb";
import {showMyLocationState} from "@/app/_state/showMyLocationState";
import {myLocationState} from "@/app/_state/myLocationState";
import {LocationInfo} from "@/app/_models/location";


const ToggleMyLocationButton = React.memo((props , context) =>{
    const [showMyLocation, setShowMyLocation] = useRecoilState(showMyLocationState);
    const setMyLocation = useSetRecoilState(myLocationState);
    const watch = useRef<number>(0);

    useEffect(() => {
        let watchId: number = 0;
        if(watch.current === 0 && showMyLocation) {
            watchId = navigator.geolocation.watchPosition(p => {
                setMyLocation(new LocationInfo(p.coords.latitude, p.coords.longitude));
            }, e => {
                console.log(e);
            })
            watch.current = watchId;
        }else{
            navigator.geolocation.clearWatch(watchId);
            watch.current = 0;
        }

        return () => {
            navigator.geolocation.clearWatch(watchId);
            watch.current = 0;
        };
    }, [showMyLocation]);

    function toggleMyLocation() {
        setShowMyLocation(prev => {
            return !prev;
        })
    }

    return <button className="p-1 w-[40px] h-[40px] bg-white shadow rounded-[2px]"
                   onClick={toggleMyLocation}>
            <TbCurrentLocation className={`${!showMyLocation && "opacity-20"} w-full h-auto`} />
    </button>;
});

ToggleMyLocationButton.displayName = "ToggleMyLocationButton";

export default ToggleMyLocationButton;