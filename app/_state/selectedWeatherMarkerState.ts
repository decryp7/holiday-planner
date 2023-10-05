import {atom} from "recoil";

export const selectedWeatherMarkerState = atom<string | undefined>({
    key: "selectedWeatherMarker",
    default: undefined
})