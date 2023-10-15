import {atom} from "recoil";

export const showMyLocationState = atom<boolean>({
    key: "showMyLocationState",
    default: false
})