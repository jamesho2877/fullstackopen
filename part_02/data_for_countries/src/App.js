import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => setCountries(response.data));
  }, []);

  const handleKeywordChange = (e) => {
    const keyword = e.target.value;
    setKeyword(keyword);
  };

  const filteredCountries = countries.filter(country => {
    const keywordLowercase = keyword.toLowerCase();
    const countryLowercase = country.name.common.toLowerCase();
    return countryLowercase.includes(keywordLowercase);
  });

  const getCountryDOM = (country) => {
    const countryName = country.name.common;

    return (
      <div>
        <h2>{countryName}</h2>
        <div>capital {country.capital.join(", ")}</div>
        <div>area {country.area}</div>
        <h4>languages:</h4>
        <ul>{Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}</ul>
        <img src={country.flags.png} alt={`${countryName}-flag`} />
      </div>
    );
  };

  const countryListDOM = filteredCountries.length > 10
    ? <div>Too many matches, specify another filter</div>
    : filteredCountries.length === 1
      ? getCountryDOM(filteredCountries[0])
      : filteredCountries.map(country => <div key={country.name.common}>{country.name.common}</div>);

  return (
    <div>
      <span>find countries</span>
      <input value={keyword} onChange={handleKeywordChange} />
      <div>{countryListDOM}</div>
    </div>
  );
};

export default App;
