import React from "react";
import {RxCross2} from "react-icons/rx";

const CrossMarker = React.memo((props : {
    lat: number,
    lng: number,
} , context) =>{

    return <RxCross2 className="text-red-700 stroke-1 drop-shadow" size="3em" />
});

CrossMarker.displayName = "CrossMarker";

export default CrossMarker;