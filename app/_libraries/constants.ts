import {DateTime, DateTimeFormatOptions} from "luxon";

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