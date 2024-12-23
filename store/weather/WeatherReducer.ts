import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {weatherSearchThunk} from './WeatherThunks';


export interface WeatherResultHour {
    time: string;
    time_epoch: number;
    condition: {
        text: string;
        icon: string;
    }
}

export interface WeatherResult {
    location: {
        name: string;
        region: string;
        country: string;
    },
    current: {
        condition: {
            text: string;
            icon: string;
        }
    },
    forecast: {
        forecastday: {
            date: string;
            hour: WeatherResultHour[]
        }[]
    }
}

export interface WeatherState {
    result?: WeatherResult;
}

const initialState: WeatherState = {};

export const Weatherlice = createSlice({
    name: 'weatherState',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(weatherSearchThunk.fulfilled, (state, action) => {
            console.log(action.payload);
            state.result = action.payload;
        });

        builder.addCase(weatherSearchThunk.rejected, (state, action) => {
            alert(action.payload)
        });

    },
    reducers: {
        setResults: (state, action: PayloadAction<WeatherResult>) => {
            state.result = action.payload;
        },
        clear: (state) => {
            state.result = undefined;
        },
    },
});

export const WeatherActions = Weatherlice.actions;

export default Weatherlice.reducer;
