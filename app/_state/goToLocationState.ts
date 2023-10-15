import {atom} from "recoil";
import Location from "../_models/location"

export const goToLocationState = atom<Location>({
    key: "goToLocationState",
    default: undefined
})