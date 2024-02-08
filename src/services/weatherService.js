import { DateTime } from "luxon";

const WEATHER_API_KEY = "1615cb770dd06b5b2b19bd0791fc7601"; // WEATHER API KEY
const FORECAST_API_KEY = "1fa9ff4126d95b8db54f3897a208e91c"

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherDataFromAPI = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: infoType === 'weather' ? WEATHER_API_KEY : FORECAST_API_KEY });
  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  // use of try catch block, how to effectively use it
  try {
    let { timezone, daily, hourly } = data;

    daily = daily?.slice(1, 6).map((d) => ({
      title: formatToLocalTime(d.dt, timezone, 'ccc'),
      temp: d.temp?.day, // Add a check for undefined temp property
      icon: d.weather?.[0]?.icon, // Add a check for undefined weather array and icon property
    })) || [];

    hourly = hourly?.slice(1, 6).map((d) => ({
      title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
      temp: d.temp, // Add a check for undefined temp property
      icon: d.weather?.[0]?.icon, // Add a check for undefined weather array and icon property
    })) || [];

    return { timezone, daily, hourly };
  } catch (error) {
    console.error('Error in formatForecastWeather:', error);
    return {};
  }
};
  

const getWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherDataFromAPI("weather", searchParams)
  .then(formatCurrentWeather);
  const { lat, lon } = formattedCurrentWeather;
  const formattedForecastWeather = await getWeatherDataFromAPI("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  // what is the use of three dots before variable, variable spreading ?????
  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
  ) => DateTime.fromSeconds(secs, { zone }).toFormat(format);

  
const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getWeatherData;

export { formatToLocalTime, iconUrlFromCode };