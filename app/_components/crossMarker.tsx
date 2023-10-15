import React from "react";
import {RxCross2} from "react-icons/rx";
import {GoDotFill} from "react-icons/go";

const CrossMarker = React.memo((props : {
    lat: number,
    lng: number,
} , context) =>{

    return <div className="relative w-fit">
        <RxCross2 className="text-red-700 stroke-[4px] drop-shadow opacity-10 animate-pulse" size="2em" />
        <RxCross2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-700 stroke-1" size="2em" />
    </div>
});

CrossMarker.displayName = "CrossMarker";

export default CrossMarker;