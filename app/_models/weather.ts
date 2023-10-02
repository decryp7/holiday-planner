export const forecastCode : {[key: string]: string} = {
    yilan2: "F-D0047-001",
    taoyuan2: "F-D0047-005",
    taipei2: "F-D0047-061",
}

export const elementCode : {[key: string]: string} = {
    weather: "Wx",
    temperature: "T"
}

export interface LocationForecast {
    locationName: string,
    geocode: number,
    lat: number,
    lon: number,
    forecast: {
        startTime: Date,
        endTime: Date,
        description: string,
        icon: string,
    }[]
}

export interface WeatherForecastModel {
    locations: LocationForecast[]
}

export interface CWAForecast {
    success: boolean;
    records: {
        locations: {
            locationsName: string,
            dataId: string,
            location: {
                locationName: string,
                geocode: number,
                lat: number,
                lon: number,
                weatherElement: {
                    elementName: string,
                    description: string,
                    time: {
                        startTime: string,
                        endTime: string,
                        elementValue: {
                            value: string
                        }[]
                    }[]
                }[]
            }[]
        }[]};
}

export class WeatherForecast implements WeatherForecastModel{
    locations: {
        locationName: string;
        geocode: number;
        lat: number;
        lon: number;
        forecast: {
            startTime: Date;
            endTime: Date;
            description: string;
            icon: string
        }[]
    }[] = [];

    constructor(cwaForecast: CWAForecast, date?: Date){
        for(const location of cwaForecast.records.locations[0].location){
            const timings = [];
            for(const t of location.weatherElement[0].time){
                const startTime = new Date(t.startTime);
                const endTime = new Date(t.endTime);

                if(date != undefined && !(startTime < date && endTime > date)){
                    continue;
                }

                timings.push({
                    startTime: new Date(t.startTime),
                    endTime: new Date(t.endTime),
                    description: t.elementValue[0].value,
                    icon: t.elementValue[1].value
                });
            }

            this.locations.push(
                {
                    locationName: location.locationName,
                    geocode: location.geocode,
                    lat: location.lat,
                    lon: location.lon,
                    forecast: timings
                }
            )
        }
    }
}