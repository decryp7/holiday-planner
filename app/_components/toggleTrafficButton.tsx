import React from "react";
import {ArchiveBoxArrowDownIcon, ArchiveBoxIcon} from "@heroicons/react/24/outline";
import {useRecoilState} from "recoil";
import {LiaTrafficLightSolid} from "react-icons/lia";
import {showTrafficState} from "@/app/_state/showTrafficState";

const ToggleTrafficButton = React.memo((props , context) =>{
    const [showTraffic, setShowTraffic] = useRecoilState(showTrafficState)

    function toggleShowTraffic() {
        setShowTraffic(prev => {
            return !prev;
        })
    }

    return <button className="p-1 w-[40px] h-[40px] bg-white shadow rounded-[2px]"
                   onClick={toggleShowTraffic}>
            <LiaTrafficLightSolid className={`${!showTraffic && "opacity-20"} w-full h-auto text-gray-800`} />
    </button>;
});

ToggleTrafficButton.displayName = "ToggleTrafficButton";

export default ToggleTrafficButton;