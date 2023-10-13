import Location from "@/app/_models/location";
import {atom} from "recoil";

export const markLocationState = atom<Location>({
    key: "markLocation",
    default: undefined
})