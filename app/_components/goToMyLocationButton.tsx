import React from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {LiaLocationArrowSolid, LiaTrafficLightSolid} from "react-icons/lia";
import {showTrafficState} from "@/app/_state/showTrafficState";
import {showMyLocationState} from "@/app/_state/showMyLocationState";
import {myLocationState} from "@/app/_state/myLocationState";
import {goToLocationState} from "@/app/_state/goToLocationState";

const GoToMyLocationButton = React.memo((props , context) =>{
    const showMyLocation = useRecoilValue(showMyLocationState);
    const myLocation = useRecoilValue(myLocationState);
    const setGoToLocation = useSetRecoilState(goToLocationState);

    function toggleShowTraffic() {
        if(showMyLocation && myLocation !== undefined){
            setGoToLocation(myLocation);
        }
    }

    return <button className="p-1 w-[40px] h-[40px] bg-white shadow rounded-[2px]"
                   onClick={toggleShowTraffic}>
        <LiaLocationArrowSolid className={`${(!showMyLocation || !myLocation) && "opacity-20"} w-full h-auto text-gray-800 stroke-1`} />
    </button>;
});

GoToMyLocationButton.displayName = "ToggleTrafficButton";

export default GoToMyLocationButton;