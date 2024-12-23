import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {RootState} from "@/store";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {weatherSearchThunk} from "@/store/weather/WeatherThunks";
import moment from "moment";
import useDebounce from "@/hooks/useDebounce";
import WeatherInfo from "@/components/WeatherSearch/WeatherInfo";
import {WeatherResultHour} from "@/store/weather/WeatherReducer";
import WeatherHoursForecast from "@/components/WeatherSearch/WeatherHoursForecast";

export default function HomeScreen() {

    const {result} = useSelector((state: RootState) => state.weather);
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const [hoursShown, setHoursShown] = useState<WeatherResultHour[]>([]);

    const fetchResults = async (q: string) => {
        await dispatch(weatherSearchThunk({cityName: q}) as any);
    }

    const now = moment();
    const nextHours = 5;

    const debouncedInputValue = useDebounce(searchText, 1000); // Debounce with 300ms delay

    useEffect(() => {
        if (debouncedInputValue)
            fetchResults(debouncedInputValue);
    }, [debouncedInputValue]);


    useEffect(() => {

        const matchingHours: WeatherResultHour[] = [];

        if (result) {

            result.forecast.forecastday.forEach(day => {
                day.hour.filter(hour => {

                    const resultHour = moment(hour.time).minutes(0);

                    const isWithinRange = (resultHour.isAfter(now) && moment(now).minutes(0).add(nextHours, 'hours').isAfter(resultHour));
                    return isWithinRange;

                }).forEach(hour => matchingHours.push(hour));

            });

            setHoursShown(matchingHours);

        }
    }, [result?.forecast?.forecastday]);


    return (
        <View style={styles.container}>

            <TextInput placeholder={'Search here'} placeholderTextColor={'black'}
                       onChangeText={(text) => setSearchText(text)} defaultValue={searchText}
                       style={styles.searchInput}/>

            {result && (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <WeatherInfo result={result}/>

                    <WeatherHoursForecast hoursShown={hoursShown}/>

                </ScrollView>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {display: 'flex', flexDirection: 'column', gap: 20},
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 20
    },
    searchInput: {
        width: '100%',
        fontSize: 20,
        color: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#CCC'
    }
});
