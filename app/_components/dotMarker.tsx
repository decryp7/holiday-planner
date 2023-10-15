import React from "react";
import {GoDotFill} from "react-icons/go";

const DotMarker = React.memo((props : {
    lat: number,
    lng: number,
} , context) =>{

    return <div className="relative w-fit">
         <GoDotFill className="text-red-700 stroke-1 drop-shadow opacity-10 animate-pulse" size="4em" />
         <GoDotFill className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-700 stroke-1" size="3em" />
    </div>
});

DotMarker.displayName = "DotMarker";

export default DotMarker;