import {render} from '@testing-library/react-native';
import WeatherHoursForecast from "@/components/WeatherSearch/WeatherHoursForecast";


describe('<WeatherHoursForecast />', () => {
    test('Text renders correctly on HomeScreen', async () => {

        const hours = [
            {
                "time_epoch": 1734843600,
                "time": "2024-12-22 00:00",
                "condition": {
                    "text": "Clear ",
                    "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
                },
            },
            {
                "time_epoch": 1734847200,
                "time": "2024-12-22 01:00",
                "condition": {
                    "text": "Partly Cloudy ",
                    "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
                },
            },
            {
                "time_epoch": 1734850800,
                "time": "2024-12-22 02:00",
                "condition": {
                    "text": "Partly Cloudy ",
                    "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
                },
            },

        ];

        const {findAllByTestId} = render(<WeatherHoursForecast hoursShown={hours}/>);

        findAllByTestId('TEST_HOUR_ITEM').then(elements => {
            expect(elements).toHaveLength(hours.length);
        });

        findAllByTestId('TEST_TIME_ID').then(elements => {
            expect(elements).toHaveLength(hours.length);
            expect(elements[0].children[0]).toEqual("00:00");
            expect(elements[1].children[0]).toEqual("01:00");
            expect(elements[2].children[0]).toEqual("02:00");
        });

    });
});
