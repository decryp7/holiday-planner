import {Prisma} from ".prisma/client";
import PlaceCreateInput = Prisma.PlaceCreateInput;
import PlaceTagCreateWithoutPlaceInput = Prisma.PlaceTagCreateWithoutPlaceInput;
import OpeningHourCreateWithoutPlaceInput = Prisma.OpeningHourCreateWithoutPlaceInput;

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

export enum Day {
    Sun = 1 << 0,
    Mon = 1 << 1,
    Tue = 1 << 2,
    Wed = 1 << 3,
    Thu = 1 << 4,
    Fri = 1 << 5,
    Sat = 1 << 6,
 }
 export const EveryDay : Day = Day.Sun | Day.Mon | Day.Tue | Day.Wed | Day.Thu | Day.Fri | Day.Sat;

export const DayFlags = Object.values(Day)
    .filter((value): value is number => typeof value === "number");

export interface OpeningHourData {
    day: Day;
    from: string;
    to: string;
}

export class OpeningHour implements OpeningHourData {
    constructor(public day: Day,
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
    tags: Tag[];
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
                public tags: Tag[],
                public openingHours: OpeningHourData[]) {
    }

    ToPlaceCreateInput(): PlaceCreateInput{
        const placeTags: PlaceTagCreateWithoutPlaceInput[] = [];
        for(const tag of this.tags) {
            placeTags.push({
                tag: {
                    connectOrCreate: {
                        where: {name: Tag[tag]},
                        create: {name: Tag[tag]}
                    }
                }
            });
        }

        const placeOpeningHours: OpeningHourCreateWithoutPlaceInput[] = [];
        for(const openingHour of this.openingHours){
            for(const day of DayFlags){
                if((day & openingHour.day) === day){
                    placeOpeningHours.push({
                        day: {connect: {name: Day[day]}},
                        from: openingHour.from,
                        to: openingHour.to
                    });
                }
            }
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