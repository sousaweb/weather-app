import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "@/api/Api";
import {WeatherResult} from "@/store/weather/WeatherReducer";

export const weatherSearchThunk = createAsyncThunk<WeatherResult | undefined, {cityName: string}>('weather/search', async ({cityName}, {dispatch}) => {

    try {

        return await Api.Weather.searchResults(cityName);

    } catch (err) {
        alert(err);
        return undefined;
    }

});
