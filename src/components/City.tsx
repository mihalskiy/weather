import React from 'react';
import {ICity} from "../redux/weather/slice";
import {majorScale, Pane, Text, Heading} from "evergreen-ui";
import {kelvinToCelsius} from "../assets/assets"

const City: React.FC<{ city: ICity | null, isLoad: boolean }> = ({city}) => {
    return (
        <>
            {
                city !== null ?
                    <Pane width={280} minHeight={200} display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"space-around"}
                          padding={majorScale(2)}
                          elevation={3}>
                        <Heading size={600}>City : {city.name}</Heading>
                        <Text size={500}>temp : {kelvinToCelsius(city.main.temp)}C</Text>
                        <Text size={500}>temp min
                            : {kelvinToCelsius(city.main.temp_min)}C to {kelvinToCelsius(city.main.temp_max)}C</Text>
                        <Text>
                          speed {city.wind.speed}м.c
                        </Text>
                        <Text>
                          humidity {city.main.humidity}%
                        </Text>
                    </Pane>
                    : <Text size={400}>city not chose)</Text>
            }
        </>
    );
};

export default City;
