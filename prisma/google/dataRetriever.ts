require('dotenv').config();

interface GooglePlaceCandidates {
    candidates: {place_id: string}[];
}

interface GooglePlaceDetails {
    result: {
        opening_hours:{
            periods: {
                close: {
                    day: number,
                    time: string,
                }
                open: {
                    day: number,
                    time: string,
                }
            }[],
            weekday_text: string[]
        },
        formatted_address: string,
        photos: {
           photo_reference: string
        }[],
        rating: number,
        url: string,
    }
}

class DataRetriever{
    private api_key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

    constructor() {
    }

    async getPlace(name: string) {
        let res = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/`+
            `json?input=${name}&inputtype=textquery&key=${this.api_key}`);

        if(!res.ok){
            throw new Error(`Google find place API error! ${await res.text()}`)
        }

        const placeCandidates = await res.json() as GooglePlaceCandidates;

        const placeId = placeCandidates.candidates[0]?.place_id;

        if(placeId == undefined) {
            throw new Error(`Google find place result error!`)
        }

        res = await fetch(`https://maps.googleapis.com/maps/api/place/details/`+
        `json?place_id=${placeId}&key=${this.api_key}`);

        if(!res.ok){
            throw new Error(`Google place details API error! ${await res.text()}`)
        }

        const placeDetails = await res.json() as GooglePlaceDetails;
        console.dir(placeDetails, {depth: null});
    }
}

new DataRetriever().getPlace("阜杭豆漿 Fu Hang Soy Milk")
    .then(_ => {
        console.log("success");
    })
    .catch(e => {
        console.log(e);
    })