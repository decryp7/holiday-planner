import React from "react";
import {Badge, Card, Divider, Italic, Subtitle, Text, Title} from "@tremor/react";
import {Place, Weekday} from "@/app/_models/place";
import PhotoCarousel from "@/app/_components/photoCarousel";
import {DateTime} from "luxon";

const SearchResultCard = React.memo((props: {place: Place}, context) =>{

    const weekday = DateTime.now().weekday;

    return <Card className="h-full bg-gray-50">
        <div className="flex flex-col space-y-2 w-full h-full">
            <div className="flex flex-row space-x-2">
                <Title className="text-2xl">{props.place.name}</Title>
                <Badge color={props.place.IsOpen() ? "green" : "red"}>{props.place.IsOpen() ? "Open" : "Closed"}</Badge>
            </div>
            <Text><Italic>{props.place.address}</Italic></Text>
            <div className="flex flex-row flex-wrap gap-2">
                {props.place.tags.map((tag, index) =>
                    <Badge key={index}>{tag.toString()}</Badge>
                )}
            </div>
            <Divider/>
            {props.place.description === undefined ? <></> :
                <Text>{props.place.description}</Text>}
            <Divider/>
            <PhotoCarousel className="w-full h-40" placeName={props.place.name} placeId={props.place.gplaceid}/>
            <Divider/>
            <Title className="px-2">Opening Hours</Title>
            <div className="flex flex-row flex-wrap gap-2">
                {props.place.getOpeningHours().map((oh, index) =>
                    <div key={index}>
                        <Subtitle
                            className={`w-fit px-2 ${+Weekday[oh.weekday as keyof typeof Weekday] === weekday ? "text-gray-800 bg-yellow-300" : ""}`}>{oh.weekday}</Subtitle>
                        <Text
                            className={`w-fit px-2 ${+Weekday[oh.weekday as keyof typeof Weekday] === weekday ? "text-gray-800 bg-yellow-300" : ""}`}>{oh.time}</Text>
                    </div>)}
            </div>
        </div>
    </Card>
});

SearchResultCard.displayName = "SearchResultCard";

export default SearchResultCard;