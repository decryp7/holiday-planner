import {atom} from "recoil";

export const showWeatherState = atom<boolean>({
    key: "showWeatherState",
    default: false
})