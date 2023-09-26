import React, {Fragment, useState, useEffect} from "react";

const DateTime = React.memo((props , context) =>{
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(() => new Date());
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, [currentDateTime]);

    return <Fragment>{currentDateTime.toTimeString()}</Fragment>;
});

DateTime.displayName = "DateTime";

export default DateTime;