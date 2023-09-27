import React, {Fragment,  useState, useEffect} from "react";
import CurrentLocation from "@/app/_models/location";
import _ from 'lodash';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {set} from "@/app/_slices/locationSlice";

const LocationInfo = React.memo((
    props : {} , context) =>{
    const {location} = useAppSelector((state)=> state.location);
    const dispatch = useAppDispatch();

    function getCurrentLocation(){
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                const current = {lat: latitude, lng: longitude};
                if(!_.isEqual(location, current)){
                    dispatch(set(current));
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