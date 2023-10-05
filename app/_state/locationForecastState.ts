import {atom} from "recoil";
import {LocationForecast} from "@/app/_models/weather";

export const locationForecastState = atom<LocationForecast>({
    key: "locationForcast",
    default: undefined
})