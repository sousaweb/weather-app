import {Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import {WeatherResultHour} from "@/store/weather/WeatherReducer";
import moment from "moment/moment";

const WeatherInfo = ({hoursShown}: { hoursShown: WeatherResultHour[] }) => {

    return <>

        <Text>Next {hoursShown.length} hours forecast below:</Text>

        {hoursShown.map(result => (
            <View testID={'TEST_HOUR_ITEM'} style={styles.hourItem} key={result.time}>
                <Text testID={'TEST_TIME_ID'}>{moment(result.time).format('HH:mm')}</Text>
                <Text>{result.condition.text}</Text>
                <Image source={{uri: `https:${result.condition.icon}`}}
                       style={styles.conditionIcon}/>
            </View>

        ))}
    </>

};

export default WeatherInfo;

const styles = StyleSheet.create({
    conditionIcon: {width: 40, height: 40},
    hourItem: {
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    }
});
