import React, {useEffect, useState} from "react";
import {SearchRequest} from "@/app/_models/searchRequest";
import useSWR from "swr";
import {fetcher} from "@/app/_libraries/constants";
import ErrorSkeleton from "@/app/_components/errorSkeleton";
import LoadingSkeleton from "@/app/_components/loadingSkeleton";
import {plainToInstance} from "class-transformer";
import {Place} from "@/app/_models/place";
import SearchResultCard from "@/app/_components/searchResultCard";
import {Virtuoso} from "react-virtuoso";

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

    return <div className="h-full">{places !== undefined && <Virtuoso
            totalCount={places.length}
            itemContent={index => <div className="p-3"><SearchResultCard key={index} place={places[index]} /></div>}
    />}</div>
});

SearchResultsPanel.displayName = "SearchResultsPanel";

export default SearchResultsPanel;