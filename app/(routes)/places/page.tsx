'use client'
import React, {useEffect, useState} from "react";
import SearchPanel from "@/app/_components/searchPanel";
import SearchResultsPanel from "@/app/_components/searchResultsPanel";
import {SearchRequest} from "@/app/_models/searchRequest";
import {Button} from "@tremor/react";

export default function Page(){
    const [searchRequest, setSearchRequest] = useState<SearchRequest>({ tags: [] });

    function handleSearch(req: SearchRequest) {
        setSearchRequest(req);
    }

    function handleGoBackToMap(){
        if(!window){
            return;
        }

        window.history.go(-1);
    }

    return <div className="flex flex-col w-full h-full align-top overflow-auto">
        <div className="h-auto p-3">
            <SearchPanel onSearch={handleSearch} />
        </div>
        <div className="h-full">
            <SearchResultsPanel searchRequest={searchRequest} />
        </div>
    </div>;
}