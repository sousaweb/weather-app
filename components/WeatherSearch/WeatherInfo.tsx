import {Image, Text, View} from "react-native";
import React from "react";
import {WeatherResult} from "@/store/weather/WeatherReducer";

const WeatherInfo = ({result}: { result: WeatherResult }) => {

    return <>

        <Text>Location Name: {result.location.name}</Text>
        <Text>Location Region: {result.location.region}</Text>
        <Text>{result.location.country}</Text>
        <View style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        }}>
            <Text>Current Condition: {result.current.condition.text}</Text>
            <Image source={{uri: `https:${result.current.condition.icon}`}}
                   style={{width: 40, height: 40}}/>
        </View>

    </>

};

export default WeatherInfo;
