export interface LocationData {
    lat: number;
    lng: number;
}

declare type CurrentLocation = LocationData | undefined;

export default CurrentLocation;