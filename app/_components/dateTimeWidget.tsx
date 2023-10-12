import React, {useEffect, useState} from "react";
import {useRecoilState, useSetRecoilState} from "recoil";
import {activeCardState} from "@/app/_state/activeCardState";
import {DateTime} from "luxon";
import {currentUnixTimeState} from "@/app/_state/currentUnixTimeState";

const DateTimeWidget = React.memo((props , context) =>{
    const [currentDateTime, setCurrentDateTime] = useRecoilState(currentUnixTimeState)
    const setActiveTab = useSetRecoilState(activeCardState);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(() => DateTime.now().toMillis());
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, [currentDateTime]);

    const t = DateTime.fromMillis(currentDateTime);

    return <div className="flex flex-col space-y-3">
        <div className="flex flex-col space-y-0 w-[40px] h-[40px] bg-white text-center shadow rounded-[2px] cursor-pointer">
            <div className="font-black text-[1rem]/[1rem]">{t.day.toLocaleString(undefined, {minimumIntegerDigits: 2})}</div>
            <div className="font-bold text-[0.70rem]/[1rem]">{t.monthShort!.toUpperCase()}</div>
            <div className="w-full h-full align-middle font-bold text-[0.70rem]/[1rem] text-white bg-gray-800 rounded-b-[2px]">
                {t.weekdayShort!.toUpperCase()}</div>
        </div>
        <div className="flex flex-col space-y-0 w-[40px] h-[40px] bg-white text-center shadow rounded-[2px]">
            <div className="font-bold text-[1.1rem]/[1.1rem] h-1/2">{t.hour.toLocaleString(undefined, {minimumIntegerDigits: 2})}</div>
            <div className="font-bold text-[1.1rem]/[1.1rem] h-1/2">{t.minute.toLocaleString(undefined, {minimumIntegerDigits: 2})}</div>
        </div>
    </div>;
});

DateTimeWidget.displayName = "DateTimeWidget";

export default DateTimeWidget;