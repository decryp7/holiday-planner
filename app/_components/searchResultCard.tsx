import React from "react";
import {Badge, Card, Divider, Italic, Subtitle, Text, Title} from "@tremor/react";
import {Place, Weekday} from "@/app/_models/place";
import PhotoCarousel from "@/app/_components/photoCarousel";
import {DateTime} from "luxon";
import PlaceDetailPanel from "@/app/_components/placeDetailPanel";

const SearchResultCard = React.memo((props: {place: Place}, context) =>{

    const weekday = DateTime.now().weekday;

    return <Card className="h-full bg-gray-50 p-5">
        <PlaceDetailPanel className="w-full" place={props.place}/>
    </Card>
});

SearchResultCard.displayName = "SearchResultCard";

export default SearchResultCard;