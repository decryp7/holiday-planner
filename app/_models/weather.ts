export const forecastCode : {[key: string]: string} = {
    yilan2: "F-D0047-001",
    taoyuan2: "F-D0047-005",
    taipei2: "F-D0047-061",
    keelung2: "F-D0047-049"
}

export const forecastElementCode : {[key: string]: string} = {
    weather: "Wx",
    temperature: "T"
}

export interface wxElement {
    startTime: string;
    endTime: string;
    elementValue: {
        value: string,
    }[];
}

export interface tElement {
    dataTime: string;
    elementValue: {
        value: string,
    }[];
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
                    time: Array<wxElement | tElement>
                }[]
            }[]
        }[]};
}

export abstract class ForecastInfo {
    protected constructor(public value: string) {
    }

    toString(): string {
        return this.value;
    }
}

export class WeatherForecastInfo extends ForecastInfo{

    constructor(public startTime: Date,
                public endTime: Date,
                value: string,
                public icon: string) {
        super(value);
    }
}

export class TemperatureForecastInfo extends ForecastInfo{

    constructor(public dataTime: Date,
                value: string) {
        super(value);
    }

    override toString(): string {
        return `${this.value}°C`;
    }
}

export interface LocationForecast {
    locationName: string,
    geocode: number,
    lat: number,
    lng: number,
    forecast: ForecastInfo[]
}

export interface WeatherForecastModel {
    locations: LocationForecast[]
}

export class WeatherForecast implements WeatherForecastModel{
    locations: LocationForecast[] = [];

    constructor(cwaForecast: CWAForecast, date?: Date){
        for(const location of cwaForecast.records.locations[0].location){
            const forecastInfos: ForecastInfo[] = [];

            for(const weatherElement of location.weatherElement){
                switch (weatherElement.elementName){
                    case forecastElementCode.weather:
                        for(const t  of weatherElement.time as Array<wxElement>){
                            const startTime = new Date(`${t.startTime} GMT+8`);
                            const endTime = new Date(`${t.endTime} GMT+8`);

                            if(date != undefined){
                                if(startTime < date && endTime > date){
                                    forecastInfos.push(new WeatherForecastInfo(startTime,
                                        endTime,
                                        t.elementValue[0].value,
                                        t.elementValue[1].value));
                                    break;
                                }
                            }else{
                                forecastInfos.push(new WeatherForecastInfo(startTime,
                                    endTime,
                                    t.elementValue[0].value,
                                    t.elementValue[1].value));
                            }
                        }
                        break;
                    case forecastElementCode.temperature:
                        for(const t of weatherElement.time as Array<tElement>){
                            const dataTime = new Date(`${t.dataTime} GMT+8`);

                            if(date != undefined){
                                if(date > dataTime) {
                                    forecastInfos.push(new TemperatureForecastInfo(dataTime, t.elementValue[0].value));
                                    break;
                                }
                            }else{
                                forecastInfos.push(new TemperatureForecastInfo(dataTime, t.elementValue[0].value));
                            }
                        }
                        break;
                }
            }

            this.locations.push(
                {
                    locationName: location.locationName,
                    geocode: location.geocode,
                    lat: location.lat,
                    lng: location.lon,
                    forecast: forecastInfos
                }
            )
        }
    }
}