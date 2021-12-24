import {createAsyncThunk} from "@reduxjs/toolkit";
import {createLinkByCityName, createLinkByLongitudeLatitude} from "../../assets/assets";
import axios from "axios"
import {ICity} from "./slice";
import {showToaster} from "../../assets/assets";

export const getWeatherByCity = createAsyncThunk("getWeatherByCity",
    async (cityName: string = "Kiev", thunkAPI) => {
        try {
            const link = createLinkByCityName(cityName)
            const response = await axios.get(link)
            return response.data as ICity
        } catch (e) {
            switch (e.response.status) {
                case 404:
                    showToaster("city not found")
                    break
                case 400:
                    showToaster("input data error")
                    break
            }
            return thunkAPI.rejectWithValue(e.message)
        }
    })
type coords = {
    longitude: number,
    latitude: number
}
export const getWeatherByLatLongitude = createAsyncThunk("getWeatherByLitLad", async (payload: coords, thunkAPI) => {
    try {
        const {longitude, latitude} = payload
        const link = createLinkByLongitudeLatitude(longitude, latitude)
        const response = await axios.get(link)
        return response.data as ICity
    } catch (e) {
        thunkAPI.dispatch(getWeatherByCity("kiev"))
        return thunkAPI.rejectWithValue(e.message)
    }
})
export const weatherAppInitilization = createAsyncThunk("getWeatherByLatLog",
    async (_, thunkAPI) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                thunkAPI.dispatch(getWeatherByLatLongitude({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                }))
            }, (error) => {
                if (error.code === 1) {
                    thunkAPI.dispatch(getWeatherByCity("kiev"))
                } else if (error.code === 3) {
                    thunkAPI.dispatch(getWeatherByCity("kiev"))
                }
            })
        } else {
            thunkAPI.dispatch(getWeatherByCity("kiev"))
        }
    })
