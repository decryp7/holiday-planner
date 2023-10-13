import React from "react";
import {RxCross2} from "react-icons/rx";

const CrossMarker = React.memo((props : {
    lat: number,
    lng: number,
    size: string,
    color: string
} , context) =>{

    return <RxCross2 size={props.size} color={props.color}/>
});

CrossMarker.displayName = "CrossMarker";

export default CrossMarker;