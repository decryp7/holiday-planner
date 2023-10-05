import React, {Fragment, useState, useEffect, MouseEventHandler} from "react";
import {useSetRecoilState} from "recoil";
import {activeCardState} from "@/app/_state/activeCardState";

const DateTime = React.memo((props , context) =>{
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const setActiveTab = useSetRecoilState(activeCardState);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(() => new Date());
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, [currentDateTime]);

    function handleDateClick(event: React.MouseEvent){
        setActiveTab("weather");
    }

    return <div className="absolute right-[0.5rem] top-[5rem] columns-1 text-gray-800">
        <div className="flex flex-col w-[40px] h-[40px] bg-white text-center shadow rounded-[2px] cursor-pointer" onClick={handleDateClick}>
            <div className="font-black text-[1rem]/[1rem]">{currentDateTime.getDate().toLocaleString(undefined, {minimumIntegerDigits: 2})}</div>
            <div className="font-bold text-[0.70rem]/[1rem]">{currentDateTime.toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
            <div className="w-full h-full align-middle font-bold text-[0.70rem]/[1rem] text-white bg-gray-800 rounded-b-[2px]">{currentDateTime.toLocaleString('default', { weekday: 'short' }).toUpperCase()}</div>
        </div>
        <div className="flex flex-col w-[40px] h-[40px] bg-white text-center pt-0.5 shadow mt-4 rounded-[2px]">
            <div className="font-bold text-[1.1rem]/[1.1rem] h-1/2">{currentDateTime.getHours().toLocaleString(undefined, {minimumIntegerDigits: 2})}</div>
            <div className="font-bold text-[1.1rem]/[1.1rem] h-1/2">{currentDateTime.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2})}</div>
        </div>
    </div>;
});

DateTime.displayName = "DateTime";

export default DateTime;