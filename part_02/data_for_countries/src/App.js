import { useState, useEffect } from "react";
import axios from "axios";

const { REACT_APP_WEATHER_API_KEY } = process.env;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [quickViewCountry, setQuickViewCountry] = useState(null);
  const [countryWeather, setCountryWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => setCountries(response.data));
  }, []);

  const handleKeywordChange = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
    setQuickViewCountry(null);
  };

  const handleShowCountry = (country) => {
    setQuickViewCountry(country);
  };

  const filteredCountries = countries.filter(country => {
    const keywordLowercase = keyword.toLowerCase();
    const countryLowercase = country.name.common.toLowerCase();
    return countryLowercase.includes(keywordLowercase);
  });

  const getCountryDOM = (country) => {
    const countryName = country.name.common;
    const weatherDOM = countryWeather
      ? (
        <>
          <h3>Weather in {countryWeather.name}</h3>
          <div>temperature {countryWeather.main.temp} Celcius</div>
          <img src={`http://openweathermap.org/img/w/${countryWeather.weather[0].icon}.png`} alt="weather icon" />
          <div>wind {countryWeather.wind.speed} m/s</div>
        </>
      )
      : "";

    return (
      <div>
        <h2>{countryName}</h2>
        <div>capital {country.capital.join(", ")}</div>
        <div>area {country.area}</div>
        <h4>languages:</h4>
        <ul>{Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}</ul>
        <img src={country.flags.png} alt={`${countryName}-flag`} />
        {weatherDOM}
      </div>
    );
  };

  const countryListDOM = filteredCountries.length > 10
    ? <div>Too many matches, specify another filter</div>
    : filteredCountries.length === 1
      ? getCountryDOM(filteredCountries[0])
      : filteredCountries.map(country => {
          const countryName = country.name.common;
          return (
            <div key={countryName}>
              <span>{countryName}</span>
              <button onClick={() => handleShowCountry(country)}>show</button>
            </div>
          )
        });

  useEffect(() => {
    const country = filteredCountries.length === 1
      ? filteredCountries[0]
      : quickViewCountry;
    if (!country) return;

    const countryName = country.name.common;
    if (countryWeather?.countryName === countryName) return;

    const [ lat, lon ] = country.capitalInfo.latlng;
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${REACT_APP_WEATHER_API_KEY}`;

    axios
      .get(weatherURL)
      .then(response => {
        setCountryWeather({
          ...response.data,
          countryName: countryName,
        });
      });
    
  }, [filteredCountries, quickViewCountry, countryWeather]);

  return (
    <div>
      <span>find countries</span>
      <input value={keyword} onChange={handleKeywordChange} />
      <div>{countryListDOM}</div>
      <div>{quickViewCountry ? getCountryDOM(quickViewCountry): ""}</div>
    </div>
  );
};

export default App;
