import {atom} from "recoil";

export const cardGroupVisibleState = atom<boolean>({
    key: "cardGroupVisibleState",
    default: true
})