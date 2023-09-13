import request from "@/utils/request"
enum API {
    NOWWEATHER_URL = '/weather/now',
    FUTUREWEATHER_URL = '/weather/future'
}
export const getNowWeather = async (city: string) => {
    return await request.post(API.NOWWEATHER_URL, { city });
}

export const getFutureWeather = async (city: string) => {
    return await request.post(API.FUTUREWEATHER_URL, { city });
}