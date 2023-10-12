'use client'
import React, {useEffect, useState} from "react";
import SearchPanel from "@/app/_components/searchPanel";
import SearchResultsPanel from "@/app/_components/searchResultsPanel";
import {SearchRequest} from "@/app/_models/searchRequest";
import {Button} from "@tremor/react";

export default function Page(){
    const [searchRequest, setSearchRequest] = useState<SearchRequest>({ tags: [] });
    const [isStandAlone, setIsStandAlone] = useState<boolean>(false);

    useEffect(() => {
        const mqStandAlone = '(display-mode: standalone)';
        if(('standalone' in navigator && navigator.standalone) || window.matchMedia(mqStandAlone).matches){
            setIsStandAlone(true);
        }
    }, []);

    function handleSearch(req: SearchRequest) {
        setSearchRequest(req);
    }

    function handleGoBackToMap(){
        if(!window){
            return;
        }

        window.history.go(-1);
    }

    return <div className="flex flex-col gap-5 w-full h-full align-top overflow-auto">
        <div className="sticky p-3 top-0 z-10 bg-slate-300">
            <SearchPanel onSearch={handleSearch} />
            {isStandAlone && <Button onClick={handleGoBackToMap}>Go back to map</Button>}
        </div>
        <div className="px-3">
            <SearchResultsPanel searchRequest={searchRequest} />
        </div>
    </div>;
}