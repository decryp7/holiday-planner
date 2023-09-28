import {atom} from "recoil";

export const activeCardState = atom<string>({
    key: "activeCard",
    default: undefined
})