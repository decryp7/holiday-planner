'use client'
import React, {useState} from "react";
import SearchPanel from "@/app/_components/searchPanel";
import SearchResultsPanel from "@/app/_components/searchResultsPanel";
import {SearchRequest} from "@/app/_models/searchRequest";

export default function Page(){
    const [searchRequest, setSearchRequest] = useState<SearchRequest>({ tags: [] });

    function handleSearch(req: SearchRequest) {
        setSearchRequest(req);
    }

    return <div className="flex flex-col gap-5 w-full h-full p-5 overflow-auto">
        <SearchPanel onSearch={handleSearch} />
        <SearchResultsPanel searchRequest={searchRequest} />
    </div>;
}