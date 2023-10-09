import {DateTime, DateTimeFormatOptions} from "luxon";
import {Prisma} from ".prisma/client";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;

export const Time24HrFormat = "HHmm";

export const SimpleTimeFormat: DateTimeFormatOptions = {...DateTime.TIME_SIMPLE, hourCycle: "h12"};

export const DateTimeFormat : DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h12",
}

export const fetcher = (url: any) => fetch(url).then(res => res.json());



