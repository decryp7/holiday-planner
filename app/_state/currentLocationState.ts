import Location from "@/app/_models/location";
import {atom} from "recoil";

export const currentLocationState = atom<Location>({
    key: "currentLocation",
    default: undefined
})