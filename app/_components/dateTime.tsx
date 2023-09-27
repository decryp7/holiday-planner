import React, {Fragment, useState, useEffect} from "react";

const DateTime = React.memo((props , context) =>{
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(() => new Date());
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, [currentDateTime]);

    return <div className="absolute right-[0.5rem] top-[5rem] columns-1 text-gray-800">
        <div className="columns-1 w-[40px] h-[40px] bg-white text-center shadow rounded">
            <div className="font-bold text-[1.1rem]/[1.1rem]">{currentDateTime.getDate()}</div>
            <div className="font-bold text-[0.70rem]/[0.70rem]">{currentDateTime.toLocaleString('default', { month: 'short' })}</div>
            <div className="relative -bottom-1 w-full font-bold text-[0.70rem]/[0.70rem] text-white bg-gray-800 rounded-b">{currentDateTime.toLocaleString('default', { weekday: 'short' })}</div>
        </div>
        <div className="flex-row w-[40px] h-[40px] bg-white text-center pt-0.5 shadow mt-2 rounded">
            <div className="font-bold text-[1.1rem]/[1.1rem] h-1/2">{currentDateTime.getHours()}</div>
            <div className="font-bold text-[1.1rem]/[1.1rem] h-1/2">{currentDateTime.getMinutes()}</div>
        </div>
    </div>;
});

DateTime.displayName = "DateTime";

export default DateTime;