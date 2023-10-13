import React, {HTMLAttributes} from "react";
import {Place, Weekday} from "@/app/_models/place";
import {Badge, Button, Card, Divider, Italic, Subtitle, Text, Title} from "@tremor/react";
import PhotoCarousel from "@/app/_components/photoCarousel";
import {DateTime} from "luxon";
import {IoMdLocate} from "react-icons/io";
import {useRecoilState, useSetRecoilState} from "recoil";
import {markLocationState} from "@/app/_state/markLocationState";
import {LocationInfo} from "@/app/_models/location";
import {GrMapLocation} from "react-icons/gr";
import {TbMap2} from "react-icons/tb";
import {isPWA} from "@/app/_libraries/isPWA";

export interface PlaceDetailPanelProps extends HTMLAttributes<HTMLDivElement>{
    place: Place,
}

const PlaceDetailPanel = React.memo((props: PlaceDetailPanelProps, context) =>{
    const {place, ...rest} = props;
    const weekday = DateTime.now().weekday;
    const setMarkLocation = useSetRecoilState(markLocationState);

    function handleLocate(){
        try {
            setMarkLocation(new LocationInfo(place.lat, place.lng));
        }catch (e: any){
            //https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
            const newWindow = window.open(`https://maps.google.com/?q=${place.lat},${place.lng}`);
            if(newWindow === null){
                return;
            }

            newWindow.opener = null;
            if(isPWA){
                newWindow.close();
            }
        }
    }

    function handleGoogleMap(){
        //https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
        const newWindow = window.open(
            `https://www.google.com/maps/search/?api=1&query=${place.name}&query_place_id=${place.gplaceid}`);
        if(newWindow === null){
            return;
        }

        newWindow.opener = null;
        if(isPWA){
            newWindow.close();
        }
    }

    return <div {...rest}>
        <div className="flex flex-col space-y-2">
            <div className="flex flex-row flex-wrap space-x-2">
                <Title className="text-2xl"><span className="text-xs">{place.id}</span> {place.name}</Title>
                <Badge color={place.IsOpen() ? "green" : "red"}>{place.IsOpen() ? "Open" : "Closed"}</Badge>
                <div className="flex flex-row flex-grow space-x-1 justify-end">
                    <Button icon={IoMdLocate} size="xs" tooltip="locate" onClick={handleLocate}/>
                    <Button icon={TbMap2} size="xs" tooltip="Google Map" onClick={handleGoogleMap}/>
                </div>
            </div>
            <Text><Italic>{place.address}</Italic></Text>
            <div className="flex flex-row flex-wrap gap-2">
                {place.tags.map((tag, index) =>
                    <Badge key={index}>{tag.toString()}</Badge>
                )}
            </div>
            <Divider/>
            {place.description === undefined ? <></> :
                <Text>{place.description}</Text>}
            <Divider/>
            <PhotoCarousel className="h-52" placeName={place.name} placeId={place.gplaceid}/>
            <Card className="p-3">
                <Title className="px-2">Opening Hours</Title>
                <div className="flex flex-row flex-wrap gap-2">
                    {place.getOpeningHours().map((oh, index) =>
                        <div key={index}>
                            <Subtitle
                                className={`w-fit px-2 ${+Weekday[oh.weekday as keyof typeof Weekday] === weekday ? "text-gray-800 bg-yellow-300" : ""}`}>{oh.weekday}</Subtitle>
                            <Text
                                className={`w-fit px-2 ${+Weekday[oh.weekday as keyof typeof Weekday] === weekday ? "text-gray-800 bg-yellow-300" : ""}`}>{oh.time}</Text>
                        </div>)}
                </div>
            </Card>
        </div>
    </div>
});

PlaceDetailPanel.displayName = "PlaceDetailPanel";

export default PlaceDetailPanel;