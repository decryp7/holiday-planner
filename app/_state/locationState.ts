import CurrentLocation from "@/app/_models/location";
import {atom} from "recoil";

export const locationState = atom<CurrentLocation>({
    key: "currentLocation",
    default: undefined
})