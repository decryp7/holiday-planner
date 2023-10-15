import {atom} from "recoil";

export const showTrafficState = atom<boolean>({
    key: "showTrafficState",
    default: false
})