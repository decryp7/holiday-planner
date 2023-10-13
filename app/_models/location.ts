export interface LocationModel {
    lat: number;
    lng: number;
}

export class LocationInfo implements LocationModel {
    constructor(public lat: number,
                public lng: number) {
    }
}

declare type Location = LocationModel | undefined;

export default Location;