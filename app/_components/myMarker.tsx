import React from "react";
import {BsFillBalloonFill} from "react-icons/bs";

const MyMarker = React.memo((props : {
    lat: number,
    lng: number,
    size: string,
    color: string
} , context) =>{

    return <BsFillBalloonFill size={props.size} color={props.color}/>
});

MyMarker.displayName = "MyMarker";

export default MyMarker;