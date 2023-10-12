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
import {Button} from "@tremor/react";

const SearchCard = React.memo((props : {} , context) =>{
    const [searchRequest, setSearchRequest] = useState<SearchRequest>({ tags: [] });

    function handleSearch(req: SearchRequest) {
        setSearchRequest(req);
    }

    function handleShowInNewWindow(event: React.MouseEvent<HTMLButtonElement>){
        if(!window){
            return;
        }
        //https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
        const newWindow = window.open("https://taiwan.decryptology.net/places", '_blank', 'noopener,noreferrer');
        if(newWindow){
            newWindow.opener = null;
        }
    }

    return <div className="flex flex-col gap-5 w-full h-full">
        <div className="flex flex-row flex-wrap gap-3 sticky">
            <SearchPanel onSearch={handleSearch} />
            <Button onClick={handleShowInNewWindow}>Show in new window</Button>
        </div>
        <SearchResultsPanel searchRequest={searchRequest} />
    </div>;
});

SearchCard.displayName = "SearchCard";

export default SearchCard;