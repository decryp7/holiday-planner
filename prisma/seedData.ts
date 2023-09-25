import {Days, OpeningHour, Place, PlaceData, Tags} from "./models";

export const Places: PlaceData[] = [
    new Place("方舟旅店長安復興館 ARK Hotel Chang'an Fuxing",
        "test",
        "",
        "",
        0, 0,
        [Tags.PlaceOfInterest],
        [new OpeningHour(Days.Mon, "09:00", "23:00")]),

    new Place("台北101 Taipei 101/World Trade Center",
        "test",
        "",
        "",
        0, 0,
        [Tags.PlaceOfInterest, Tags.Food],
        [new OpeningHour(Days.Mon, "09:00", "23:00")]),
];