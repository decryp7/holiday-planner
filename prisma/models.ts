import {Prisma} from ".prisma/client";
import PlaceCreateInput = Prisma.PlaceCreateInput;
import PlaceTagCreateWithoutPlaceInput = Prisma.PlaceTagCreateWithoutPlaceInput;
import OpeningHourCreateWithoutPlaceInput = Prisma.OpeningHourCreateWithoutPlaceInput;

export enum Tags {
    Food,
    PlaceOfInterest,
    Taipei,
    JiuFen,
    ShiFen,
    Badouzi,
    Tamsui,
    YiLan
}

export enum Days {
    Sun,
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat
}

export interface OpeningHourData {
    day: Days;
    from: string;
    to: string;
}

export class OpeningHour implements OpeningHourData {
    constructor(public day: Days,
                public from: string,
                public to: string) {
    }
}

export interface PlaceData {
    name: string;
    description: string;
    address: string;
    url: string;
    lat: number;
    lng: number;
    tags: Tags[];
    openingHours: OpeningHour[];

    ToPlaceCreateInput(): PlaceCreateInput;
}

export class Place implements PlaceData {
    constructor(public name: string,
                public description: string,
                public url: string,
                public address: string,
                public lat: number,
                public lng: number,
                public tags: Tags[],
                public openingHours: OpeningHourData[]) {
    }

    ToPlaceCreateInput(): PlaceCreateInput{
        const placeTags: PlaceTagCreateWithoutPlaceInput[] = [];
        for(const tag of this.tags) {
            placeTags.push({
                tag: {
                    connectOrCreate: {
                        where: {name: Tags[tag]},
                        create: {name: Tags[tag]}
                    }
                }
            });
        }

        const placeOpeningHours: OpeningHourCreateWithoutPlaceInput[] = [];
        for(const openingHour of this.openingHours){
            placeOpeningHours.push({
                day: {connect: {name: Days[openingHour.day]}},
                from: openingHour.from,
                to: openingHour.to
            });
        }

        return  {
            name: this.name,
            description: this.description,
            url: this.url,
            address: this.address,
            lat: this.lat,
            lng: this.lng,
            tags: {
                create: placeTags
            },
            openingHours: {
                create: placeOpeningHours
            }
        };
    }
}