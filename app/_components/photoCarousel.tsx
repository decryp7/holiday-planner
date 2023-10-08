import React, {Suspense, useEffect, useState} from "react";
import LoadingSkeleton from "@/app/_components/loadingSkeleton";
import Image from "next/image";

async function Photos(props: {placeId: string, placeName: string}){
    const [placePhotos, setPlacePhotos] = useState<string[]>([]);

    async function fetchPhotos(){
        const url = `/api/places/photos?${props.placeId}`;
        const placePhotos = await fetch(url)
            .then(async res => JSON.parse(await res.json())) as string[];
        setPlacePhotos(placePhotos);
    }

    useEffect(() => {
        if(props.placeId === undefined ||
            props.placeName === undefined){
            return;
        }

        fetchPhotos()
            .catch((e: any) =>{
                console.log(`Error occurred when fetching details for ${props.placeName}. Error: ${e}`);
            });
    }, [props.placeId]);

    return <div className="flex flex-row h-full snap-x snap-mandatory overflow-auto">
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
    </div>;
}

const PhotoCarousel = React.memo((
    props : { placeId: string, placeName: string} , context) =>{

    return <div className="w-full h-[90%]">
        <Suspense fallback={<LoadingSkeleton/>}>
            <Photos placeName={props.placeName}
            placeId={props.placeId} />
        </Suspense>
    </div>
});

PhotoCarousel.displayName = "PhotoCarousel";

export default PhotoCarousel;