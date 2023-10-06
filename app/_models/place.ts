import {Prisma} from ".prisma/client";
import CloseHourCreateWithoutPlaceInput = Prisma.CloseHourCreateWithoutPlaceInput;
import PlaceCreateInput = Prisma.PlaceCreateInput;
import PlaceTagCreateWithoutPlaceInput = Prisma.PlaceTagCreateWithoutPlaceInput;
import OpenHourCreateWithoutPlaceInput = Prisma.OpenHourCreateWithoutPlaceInput;
import {DateTime} from "luxon";
import {plainToInstance, Transform} from "class-transformer";
import {SimpleTimeFormat, Time24HrFormat} from "../_libraries/constants";

export enum Tag {
    Accommodation,
    Attraction,
    Food,
    Taipei,
    JiuFen,
    ShiFen,
    Badouzi,
    Tamsui,
    YiLan
}

export interface OpenHourData {
    day: number;
    time: string;
}

export class OpenHour implements OpenHourData {
    constructor(public day: number,
                public time: string) {
    }
}

export interface CloseHourData {
    day: number;
    time: string;
}

export class CloseHour implements CloseHourData {
    constructor(public day: number,
                public time: string) {
    }
}

export interface PlaceData {
    name: string;
    description: string;
    gplaceid: string;
    address: string;
    url: string;
    lat: number;
    lng: number;
    tags: string[];
    openHours?: OpenHourData[];
    closeHours?: CloseHourData[]

    ToPlaceCreateInput(): PlaceCreateInput;
    IsOpen(): boolean;
    getOpeningHours(): OpeningHour[]
}

export enum Weekday {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

export interface OpeningHour {
    weekday: string,
    time: string,
}

const opening24Hours: OpeningHour[] = Object.keys(Weekday)
    .filter(i => isNaN(+i))
    .map(wd => { return { weekday: wd, time: "24hrs" }});

export class Place implements PlaceData {
    @Transform(params => plainToInstance(OpenHour, params.value))
    openHours?: OpenHourData[]
    @Transform(params => plainToInstance(CloseHour, params.value))
    closeHours?: CloseHourData[]
    @Transform(params => (params.value as {tagName: string}[]).map(t => t.tagName))
    tags: string[]

    constructor(public name: string,
                public description: string,
                public gplaceid: string,
                public url: string,
                public address: string,
                public lat: number,
                public lng: number,
                tags: string[],
                openHours?: OpenHourData[],
                closeHours?: CloseHourData[]) {
        this.openHours = openHours;
        this.closeHours = closeHours;
        this.tags = tags;
    }

    IsOpen(): boolean {
        const now = DateTime.now().setZone("Asia/Taipei");
        const weekday = now.weekday;

        if(this.openHours == undefined || this.openHours.length == 0){
            return true;
        }

        if(this.closeHours == undefined || this.closeHours.length == 0){
            return true;
        }

        const openHour = this.openHours.find(oh => +oh.day === weekday);
        const closeHour = this.closeHours.find(ch => +ch.day === weekday);
        if(openHour === undefined || closeHour === undefined){
            return false;
        }

        return true;
    }

    getOpeningHours(): OpeningHour[] {
        const openingHours: OpeningHour[] = [];

        if(this.openHours === undefined || this.openHours.length === 0){
            return opening24Hours;
        }

        if(this.closeHours === undefined || this.closeHours.length === 0){
            return opening24Hours;
        }

        for(const oh of this.openHours){
            const ch = this.closeHours.find(ch => ch.day === oh.day);
            const time = `${DateTime.fromFormat(oh.time, Time24HrFormat).toLocaleString(SimpleTimeFormat)}`+
                ` - ${ch !== undefined ? DateTime.fromFormat(ch.time, Time24HrFormat).toLocaleString(SimpleTimeFormat) : ""}`;
            openingHours.push({weekday: Weekday[+oh.day], time: time});
        }

        return openingHours;
    }

    ToPlaceCreateInput(): PlaceCreateInput{
        const placeTags: PlaceTagCreateWithoutPlaceInput[] = [];
        for(const tag of this.tags) {
            placeTags.push({
                tag: {
                    connectOrCreate: {
                        where: {name: tag.toLowerCase()},
                        create: {name: tag.toLowerCase()}
                    }
                }
            });
        }

        let placeOpenHours: OpenHourCreateWithoutPlaceInput[] = [];
        if(this.openHours != undefined) {
            for (const openHour of this.openHours) {
                placeOpenHours.push({
                    day: openHour.day === 0 ? 7 : openHour.day,
                    time: openHour.time,
                });
            }
        }

        let placeCloseHours: CloseHourCreateWithoutPlaceInput[] = [];
        if(this.closeHours != undefined) {
            for (const closeHour of this.closeHours) {
                placeCloseHours.push({
                    day: closeHour.day === 0 ? 7: closeHour.day,
                    time: closeHour.time,
                });
            }
        }

        return  {
            name: this.name,
            gplaceid: this.gplaceid,
            description: this.description,
            url: this.url,
            address: this.address,
            lat: this.lat,
            lng: this.lng,
            tags: {
                create: placeTags
            },
            ...(OpenHour != undefined && {openHours: {
                    create: placeOpenHours
                }}),
            ...(CloseHour != undefined && {closeHours: {
                    create: placeCloseHours
                }}),
        };
    }
}