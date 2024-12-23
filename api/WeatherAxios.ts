import axios, {AxiosInstance} from "axios";

const WeatherAxios: AxiosInstance = axios.create({
    baseURL: 'https://api.weatherapi.com/v1',
    params: {key: process.env.EXPO_PUBLIC_WEATHER_API_KEY},
});

export default WeatherAxios;
