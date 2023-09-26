import React from "react";

const MapMarker = React.memo((props: {lat: number, lng: number, text: string}, context) =>{
   return <div className="absolute  bg-amber-600 text-black z-10">{props.text}</div>
});

MapMarker.displayName = "MapMarker";

export default MapMarker;