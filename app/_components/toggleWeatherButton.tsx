import React from "react";
import {ArchiveBoxArrowDownIcon, ArchiveBoxIcon} from "@heroicons/react/24/outline";
import {useRecoilState} from "recoil";
import {showWeatherState} from "@/app/_state/showWeatherState";
import {TiWeatherCloudy} from "react-icons/ti";

const ToggleWeatherButton = React.memo((props , context) =>{
    const [showWeather, setShowWeather] = useRecoilState(showWeatherState);

    function toggleShowWeather() {
        setShowWeather(prev => {
            return !prev;
        })
    }

    return <button className="p-1 w-[40px] h-[40px] bg-white shadow rounded-[2px]"
                   onClick={toggleShowWeather}>
            <TiWeatherCloudy className={`${!showWeather && "opacity-20"} w-full h-auto text-gray-800`} />
    </button>;
});

ToggleWeatherButton.displayName = "ToggleWeatherButton";

export default ToggleWeatherButton;