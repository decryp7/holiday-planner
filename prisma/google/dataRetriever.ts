import {Place, PlaceData, OpenHourData, CloseHourData, OpenHour, CloseHour} from "../models";
import dotenv from 'dotenv';
import fs from 'fs';
import {Readable} from "stream";
import {finished} from "stream/promises";
import path from "path";
import decompress from "decompress";
import {XMLParser} from "fast-xml-parser";
import {ReadableStream} from "stream/web";

dotenv.config();

interface GooglePlaceCandidates {
    candidates: {place_id: string}[];
}

interface GooglePlaceDetails {
    result: {
        editorial_summary: {
            overview: string,
        },
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
        place_id: string,
        rating: number,
        url: string,
        types: string[]
    }
}

interface KMLData {
    kml: {
        Document:{
            name: string,
            Folder: {
                name: string,
                Placemark: {
                    name: string,
                    Point: {
                        coordinates: string
                    }
                }[]
            }[],
        }
    }
}

class KMLPlace {
    constructor(public folder: string, public name: string, public coordinates: string) {
    }
}

class KMLDataRetriever {
    private tempFolder = path.resolve(".", "temp");

    constructor() {
        if(!fs.existsSync(this.tempFolder)){
            fs.mkdirSync(this.tempFolder);
        }
    }

    async getPlaces(): Promise<KMLPlace[]> {
        const res = await fetch("https://www.google.com/maps/d/u/0/kml?mid=1m2ouMpaefFlRqXtfxHMSUHfTp1Wbkps");

        if(!res.ok || res.status != 200){
            throw new Error("Failed to download kmz");
        }

        const kmlPlaces: KMLPlace[] = [];

        try {
            const destination = path.resolve(this.tempFolder, "taiwan.kmz");
            const fileStream = fs.createWriteStream(destination, {flags: 'w'});
            await finished(Readable.fromWeb(res.body as ReadableStream).pipe(fileStream));

            await decompress(destination, this.tempFolder);

            const file = path.resolve(this.tempFolder, "doc.kml");
            const xmlFile = fs.readFileSync(file, 'utf8');
            const parser = new XMLParser();
            const kmlData = parser.parse(xmlFile) as KMLData;

            for(const folder of kmlData.kml.Document.Folder){
                for(const placemark of folder.Placemark){
                    kmlPlaces.push(new KMLPlace(folder.name, placemark.name, placemark.Point.coordinates));
                }
            }
        }catch (e: any){
            throw new Error(`Failed to get places. ${e.message}` , e);
        }

        return kmlPlaces;
    }
}

class PlaceDataRetriever{
    private apiKey = process.env.GOOGLE_MAP_API_KEY;
    private placeImgFolder = path.resolve(".", "public", "place-img");

    constructor() {
        if(!fs.existsSync(this.placeImgFolder)){
            fs.mkdirSync(this.placeImgFolder);
        }
    }

    async getPlace(name: string): Promise<GooglePlaceDetails> {
        let res = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/` +
            `json?input=${name}&inputtype=textquery&key=${this.apiKey}`);

        if (!res.ok || res.status != 200) {
            throw new Error(`Google find place API error! ${await res.text()}`)
        }

        console.log(res.status);
        const placeCandidates = await res.json() as GooglePlaceCandidates;

        const placeId = placeCandidates.candidates[0]?.place_id;

        if (placeId == undefined) {
            throw new Error(`Google find place result error. name:${name}!`)
        }

        res = await fetch(`https://maps.googleapis.com/maps/api/place/details/` +
            `json?place_id=${placeId}&key=${this.apiKey}`);

        if (!res.ok || res.status != 200) {
            throw new Error(`Google place details API error! name:${name} ${await res.text()}`)
        }

        const placeDetails = await res.json() as GooglePlaceDetails

        res = await fetch(`https://maps.googleapis.com/maps/api/place/photo?` +
        `maxwidth=400` +
        `&photo_reference=${placeDetails.result.photos[0].photo_reference}` +
        `&key=${this.apiKey}`);

        if(!res.ok || res.status != 200){
            throw new Error(`Google place photo API error! name:${name}. Status: ${res.statusText}`)
        }

        const destination = path.resolve(this.placeImgFolder, `${placeId}.jpg`);
        const fileStream = fs.createWriteStream(destination, {flags: 'w'});
        await finished(Readable.fromWeb(res.body as ReadableStream).pipe(fileStream));

        return placeDetails;
    }
}

export class PlacesGenerator {
    constructor() {
    }

    async getPlaces(): Promise<PlaceData[]> {
        const placeData : PlaceData[] = [];

        try{
            const placeDataRetriever = new PlaceDataRetriever();

            const kmlPlaces = await new KMLDataRetriever().getPlaces();
            for(const kmlPlace of kmlPlaces){
                try{
                    const place = await placeDataRetriever.getPlace(kmlPlace.name);

                    const openHours: OpenHourData[] = [];
                    const closeHours: CloseHourData[] = [];
                    const hasOpeningHours = place.result.opening_hours != undefined;

                    if(hasOpeningHours) {
                        for (const period of place.result.opening_hours.periods) {
                            if(period.open != undefined){
                                openHours.push(new OpenHour(period.open.day, period.open.time));
                            }
                            if(period.close != undefined) {
                                closeHours.push(new CloseHour(period.close.day, period.close.time));
                            }
                        }
                    }

                    const [lat, lng] = kmlPlace.coordinates.split(",");

                    placeData.push(new Place(
                        kmlPlace.name,
                        place.result.editorial_summary != undefined ? place.result.editorial_summary.overview : "",
                        place.result.place_id,
                        place.result.url,
                        place.result.formatted_address,
                        +lat,
                        +lng,
                        [kmlPlace.folder, ...place.result.types],
                        openHours,
                        closeHours));
                }catch (e: any) {
                    console.log(`Failed to find place. place:${kmlPlace.name}. ${e.message}`);
                }
            }

            //fs.writeFileSync(path.resolve(".","temp","googleplaces.json"), JSON.stringify(places));

        }catch (e: any){
            throw new Error(`Failed to generate places data. ${e.message}`, e);
        }

        return placeData;
    }
}

new PlacesGenerator().getPlaces()
    .then(r => {
        fs.writeFileSync(path.resolve(".","temp","places.json"), JSON.stringify(r));
    })
    .catch(e => {
        console.log(e);
    });