import {Day, EveryDay, OpeningHour, Place, PlaceData, Tag} from "./models";

export const Places: PlaceData[] = [
    new Place("方舟旅店長安復興館 ARK Hotel Chang'an Fuxing",
        "test",
        "",
        "",
        25.0442451,
        121.5247397,
        [Tag.Attraction, Tag.Taipei, Tag.Accommodation],
        [
            new OpeningHour(EveryDay, "09:00", "23:00"),
        ]),

    new Place("台北101 Taipei 101 World Trade Center",
        "test",
        "",
        "",
        25.05201288294568,
        121.54595375061035,
        [Tag.Attraction, Tag.Food, Tag.Taipei],
        [new OpeningHour(Day.Mon, "09:00", "23:00")]),
];