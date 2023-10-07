import React, {Suspense} from "react";
import LoadingSkeleton from "@/app/_components/loadingSkeleton";
import Image from "next/image";

const PhotoCarousel = React.memo((
    props : { placeId: string, placeName: string} , context) =>{

    async function Photos(){
        const url = `/api/places/photos?${props.placeId}`;
        const placePhotos = await fetch(url)
            .then(async res => JSON.parse(await res.json())) as string[];

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
        </div>
    }

    return <div className="w-full h-[90%]">
        <Suspense fallback={<LoadingSkeleton/>}>
            <Photos />
        </Suspense>
    </div>
});

PhotoCarousel.displayName = "PhotoCarousel";

export default PhotoCarousel;