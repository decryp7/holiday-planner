import React, {Fragment, useEffect, useState} from "react";
import {MultiSelect, MultiSelectItem, Select, SelectItem, Title} from "@tremor/react";
import useSWR from "swr";
import {fetcher} from "@/app/_libraries/constants";
import ErrorSkeleton from "@/app/_components/errorSkeleton";
import LoadingSkeleton from "@/app/_components/loadingSkeleton";
import {Text, Button} from "@tremor/react";
import {DateTime} from "luxon";
import {AiOutlineTags, AiOutlineCalendar, AiOutlineFieldTime, AiOutlineSearch} from "react-icons/ai";
import {SearchRequest} from "@/app/_models/searchRequest";

const SearchPanel = React.memo((props: {onSearch: (req: SearchRequest) => void} , context) =>{
    const now = DateTime.now();
    const [mounted, setMounted] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [day, setDay] = useState(now.day.toString());
    const [hour, setHour] = useState(now.hour.toString());
    const {data, error, isLoading} =
        useSWR(mounted ? `/api/places/tags` : null, fetcher);

    useEffect(() => {
        setMounted(true);
    }, []);

    function handleSearch(){
        props.onSearch({
            tags: tags,
            day: +day,
            hour: +hour,
        })
    }

    if (error) return <ErrorSkeleton message={`Failed to find tags.`} />
    if (isLoading) return <LoadingSkeleton />

    const placeTags = data !== undefined ? data as string[] : [];

    const days = new Date(now.year, now.month, 0).getDate();
    const daysArray = Array.from({length: days}, (_, i) => i+1);
    const hoursArray = Array.from({length: 24}, (_, i) => i);

    return <div className="flex flex-row flex-wrap gap-3 items-center w-full h-full">
        <div className="flex flex-row space-x-2 items-center w-full">
            <Title>Tags</Title>
            <MultiSelect
                placeholder="Please select tags" value={tags} onValueChange={setTags}>
                {placeTags.map((tag, index) =>
                    <MultiSelectItem key={index} value={tag}>{tag}</MultiSelectItem>
                )}
            </MultiSelect>
        </div>
        <div className="flex flex-row space-x-2 items-center">
            <Title>Date</Title>
            <Select value={day} onValueChange={setDay} className="w-min">
                {daysArray.map((d, index) =>
                    <SelectItem key={index} value={d.toString()}>{d}</SelectItem>)}
            </Select>
        </div>
        <div className="flex flex-row space-x-2 items-center">
            <Title>Time</Title>
            <Select value={hour} onValueChange={setHour} className="w-min">
                {hoursArray.map((h, index) =>
                    <SelectItem key={index} value={h.toString()}>{h}</SelectItem>)}
            </Select>
        </div>
        <Button icon={AiOutlineSearch} onClick={handleSearch}>Search</Button>
    </div>;
});

SearchPanel.displayName = "SearchPanel";

export default SearchPanel;