import {WeatherResult} from "@/store/weather/WeatherReducer";
import WeatherAxios from "@/api/WeatherAxios";

class Weather {

    public async searchResults(cityName: string): Promise<WeatherResult | undefined> {

        try {
            const response = await WeatherAxios.get('forecast.json', {params: {days: 2, q: cityName, aqi: 'no', alerts: 'no'}});

            console.log('data', typeof response.data);
            return response.data;

        } catch (err) {

            return undefined;

        }


    }

}

export default new Weather();
