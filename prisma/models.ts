import {Prisma} from ".prisma/client";
import PlaceCreateInput = Prisma.PlaceCreateInput;
import PlaceTagCreateWithoutPlaceInput = Prisma.PlaceTagCreateWithoutPlaceInput;
import OpenHourCreateWithoutPlaceInput = Prisma.OpenHourCreateWithoutPlaceInput;
import CloseHourCreateWithoutPlaceInput = Prisma.CloseHourCreateWithoutPlaceInput;

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
}

export class Place implements PlaceData {
    constructor(public name: string,
                public description: string,
                public gplaceid: string,
                public url: string,
                public address: string,
                public lat: number,
                public lng: number,
                public tags: string[],
                public openHours?: OpenHourData[],
                public closeHours?: CloseHourData[]) {
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
                    day: openHour.day,
                    time: openHour.time,
                });
            }
        }

        let placeCloseHours: CloseHourCreateWithoutPlaceInput[] = [];
        if(this.closeHours != undefined) {
            for (const closeHour of this.closeHours) {
                placeCloseHours.push({
                    day: closeHour.day,
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