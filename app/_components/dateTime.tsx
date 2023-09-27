import React, {Fragment, useState, useEffect} from "react";

const DateTime = React.memo((props , context) =>{
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(() => new Date());
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, [currentDateTime]);

    return <div className="block">{currentDateTime.toTimeString()}</div>;
});

DateTime.displayName = "DateTime";

export default DateTime;