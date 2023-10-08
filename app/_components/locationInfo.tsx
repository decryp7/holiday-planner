import React, {Fragment, useEffect} from "react";
import _ from 'lodash';
import {useRecoilState} from "recoil";
import {currentLocationState} from "@/app/_state/currentLocationState";

const LocationInfo = React.memo((
    props : {} , context) =>{
    const [location, setLocation] = useRecoilState(currentLocationState);

    function getCurrentLocation(){
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                const current = {lat: latitude, lng: longitude};
                if(!_.isEqual(location, current)){
                    setLocation(current);
                }
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
        }
    }, []);

    return <div>
        <Fragment>{JSON.stringify(location)}</Fragment>
    </div>
});

LocationInfo.displayName = "LocationInfo";

export default LocationInfo;