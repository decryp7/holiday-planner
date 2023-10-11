import React, {useEffect, useState} from "react";
import {SearchRequest} from "@/app/_models/searchRequest";
import useSWR from "swr";
import {fetcher} from "@/app/_libraries/constants";
import ErrorSkeleton from "@/app/_components/errorSkeleton";
import LoadingSkeleton from "@/app/_components/loadingSkeleton";
import {plainToInstance} from "class-transformer";
import {Place} from "@/app/_models/place";
import SearchResultCard from "@/app/_components/searchResultCard";

const SearchResultsPanel = React.memo((
    props: {searchRequest: SearchRequest | undefined}, context) =>{
    const [mounted, setMounted] = useState(false);
    const {data, error, isLoading} =
        useSWR(mounted && props.searchRequest ? `/api/places?tags=${props.searchRequest.tags.join(",")}` : null, fetcher);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (error) return <ErrorSkeleton message={`Failed to find places with tags ${props.searchRequest?.tags.join(", ")}.`} />
    if (isLoading) return <LoadingSkeleton />

    const places = plainToInstance(Place, data);

    return <div className="flex flex-col gap-5 h-full">
        {places !== undefined && places.map((p, index) =>
            <SearchResultCard key={index} place={p} />)}
    </div>
});

SearchResultsPanel.displayName = "SearchResultsPanel";

export default SearchResultsPanel;