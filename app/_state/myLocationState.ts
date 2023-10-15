import {atom} from "recoil";
import Location from "../_models/location"

export const myLocationState = atom<Location>({
    key: "myLocationState",
    default: undefined
})