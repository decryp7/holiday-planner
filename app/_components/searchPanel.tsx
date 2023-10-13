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
    const [mounted, setMounted] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const {data, error, isLoading} =
        useSWR(mounted ? `/api/places/tags` : null, fetcher);

    useEffect(() => {
        setMounted(true);
    }, []);

    function handleSearch(){
        props.onSearch({
            tags: tags,
        })
    }

    if (error) return <ErrorSkeleton message={`Failed to find tags.`} />
    if (isLoading) return <LoadingSkeleton />

    const placeTags = data !== undefined ? data as string[] : [];

    return <div className="flex flex-row gap-3 items-center w-full h-full">
        <Title>Tags</Title>
        <MultiSelect
            placeholder="Please select tags" value={tags} onValueChange={setTags}>
            {placeTags.map((tag, index) =>
                <MultiSelectItem key={index} value={tag}>{tag}</MultiSelectItem>
            )}
        </MultiSelect>
        <Button icon={AiOutlineSearch} size="xs" onClick={handleSearch}>Search</Button>
    </div>;
});

SearchPanel.displayName = "SearchPanel";

export default SearchPanel;