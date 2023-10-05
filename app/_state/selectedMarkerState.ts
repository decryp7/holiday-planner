import {atom} from "recoil";

export const selectedMarkerState = atom<string>({
    key: "selectedMarker",
    default: undefined
})