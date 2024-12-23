import {combineReducers, configureStore} from '@reduxjs/toolkit';
import weatherReducer, {WeatherState} from "@/store/weather/WeatherReducer";

export interface RootState {
    weather: WeatherState;
}

const reducers = combineReducers({
    weather: weatherReducer,
});

export const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});
