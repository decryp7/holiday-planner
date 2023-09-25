import {Day, EveryDay, OpeningHour, Place, PlaceData, Tag} from "./models";

export const Places: PlaceData[] = [
    new Place("方舟旅店長安復興館 ARK Hotel Chang'an Fuxing",
        "test",
        "",
        "",
        0, 0,
        [Tag.Attraction, Tag.Taipei, Tag.Accommodation],
        [
            new OpeningHour(EveryDay, "09:00", "23:00"),
        ]),

    new Place("台北101 Taipei 101 World Trade Center",
        "test",
        "",
        "",
        0, 0,
        [Tag.Attraction, Tag.Food, Tag.Taipei],
        [new OpeningHour(Day.Mon, "09:00", "23:00")]),
];