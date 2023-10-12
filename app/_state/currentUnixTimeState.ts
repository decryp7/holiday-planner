import {atom} from "recoil";
import {DateTime} from "luxon";

export const currentUnixTimeState = atom<number>({
    key: "currentDateTime",
    default: DateTime.now().toMillis()
})