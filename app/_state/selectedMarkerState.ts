import {atom} from "recoil";

export const selectedMarkerState = atom<string | undefined>({
    key: "selectedMarker",
    default: undefined
})