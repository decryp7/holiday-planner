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

export const fetcher = async (url: any) =>{
    const res = await fetch(url)

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.')
    }

    return res.json();
}



