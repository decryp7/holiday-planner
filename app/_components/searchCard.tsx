import React, {useEffect, useState} from "react";
import SearchPanel from "@/app/_components/searchPanel";
import useSWR from "swr";
import {fetcher} from "@/app/_libraries/constants";
import ErrorSkeleton from "@/app/_components/errorSkeleton";
import LoadingSkeleton from "@/app/_components/loadingSkeleton";
import {plainToInstance} from "class-transformer";
import {Place} from "@/app/_models/place";
import {SearchRequest} from "@/app/_models/searchRequest";
import SearchResultsPanel from "@/app/_components/searchResultsPanel";

const SearchCard = React.memo((props : {} , context) =>{
    const [searchRequest, setSearchRequest] = useState<SearchRequest>({ tags: [] });

    function handleSearch(req: SearchRequest) {
        setSearchRequest(req);
    }

    return <div className="flex flex-col gap-5 w-full h-full">
        <SearchPanel onSearch={handleSearch} />
        <SearchResultsPanel searchRequest={searchRequest} />
    </div>;
});

SearchCard.displayName = "SearchCard";

export default SearchCard;