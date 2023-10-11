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

    return <div className="flex flex-col gap-5 w-full h-full align-top overflow-auto">
        <div className="sticky p-3 top-0 z-10 bg-slate-300">
            <SearchPanel onSearch={handleSearch} />
        </div>
        <div className="px-3">
            <SearchResultsPanel searchRequest={searchRequest} />
        </div>
    </div>;
}