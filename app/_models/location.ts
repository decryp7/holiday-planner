export interface LocationInfo {
    lat: number;
    lng: number;
}

declare type Location = LocationInfo | undefined;

export default Location;