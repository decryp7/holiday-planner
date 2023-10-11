import React, {HTMLAttributes, Suspense, useEffect, useState} from "react";
import LoadingSkeleton from "@/app/_components/loadingSkeleton";
import Image from "next/image";
import useSWR from "swr";
import {fetcher} from "@/app/_libraries/constants";
import {da} from "date-fns/locale";
import ErrorSkeleton from "@/app/_components/errorSkeleton";

export interface PhotoCarouselProps extends HTMLAttributes<HTMLDivElement>{
    placeId: string;
    placeName: string;
}

const PhotoCarousel = React.memo((
    props : PhotoCarouselProps, context) =>{
    const {data, error, isLoading} = useSWR(`/api/places/photos?id=${props.placeId}`, fetcher);

    if (error) return <ErrorSkeleton message={`Failed to find photos for ${props.placeName}.`} />
    if (isLoading) return <LoadingSkeleton />

    const placePhotos = JSON.parse(data) as string[];

    return <div className={props.className}>
        <div className="flex flex-row h-full snap-x snap-mandatory overflow-auto">
            {placePhotos.map((p, index) =>
                <Image
                    key={index}
                    alt={props.placeName}
                    src={p}
                    width="0"
                    height="0"
                    sizes="100vh"
                    className="w-auto h-full snap-center saturate-200"></Image>
            )}
        </div>
    </div>
});

PhotoCarousel.displayName = "PhotoCarousel";

export default PhotoCarousel;