import React, {Fragment,  useState, useEffect} from "react";
import CurrentLocation from "@/app/_models/location";
import _ from 'lodash';

const LocationInfo = React.memo((
    props : { onLocationChanged: (location: CurrentLocation) => void} , context) =>{
    const [currentLocation, setCurrentLocation] = useState<CurrentLocation>(undefined);

    function getCurrentLocation(){
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                let prevValue: CurrentLocation = undefined;
                setCurrentLocation(prev => {
                    const current = {lat: latitude, lng: longitude};
                    if(!_.isEqual(prev, current)){
                        props.onLocationChanged(current);
                    }
                    return {lat:latitude, lng:longitude};
                });
            }, error =>{
                console.log(`Unable to get user's location. ${error}`);
                alert("Unable to get your current location.");
            })
        }else{
            alert("geolocation not supported!");
        }
    }

    useEffect(() => {
        if('geolocation' in navigator) {
            getCurrentLocation();
            const interval = setInterval(() => {
                getCurrentLocation();
            }, 5 * 1000);

            return () => clearInterval(interval);
        }
    }, [currentLocation]);

    return <div>
        <Fragment>{JSON.stringify(currentLocation)}</Fragment>
    </div>
});

LocationInfo.displayName = "LocationInfo";

export default LocationInfo;