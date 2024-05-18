import React, { useEffect, useState } from 'react';
import './style.css';

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchURL = async () => {
      const response = await fetch(
        `https://apps.kodim.cz/daweb/leviexpress/api/cities`,
      );
      const data = await response.json();
      const citiesZAPI = data.results;
      setCities(citiesZAPI);
    };
    fetchURL();
  }, []);

  useEffect(() => {
    const fetchURL = async () => {
      const response = await fetch(
        `https://apps.kodim.cz/daweb/leviexpress/api/dates`,
      );
      const data = await response.json();
      const datesZAPI = data.results;
      setDates(datesZAPI);
    };
    fetchURL();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://apps.kodim.cz/daweb/leviexpress/api/journey?fromCity=${fromCity}&toCity=${toCity}&date=${date}`,
    );
    const data = await response.json();
    const spojeni = data.results;
    onJourneyChange(spojeni);
  };

  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form className="journey-picker__form" onSubmit={handleSubmit}>
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            >
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select value={date} onChange={(e) => setDate(e.target.value)}>
              <DatesOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button
              disabled={!(fromCity && toCity && date && fromCity !== toCity)}
              className="btn"
              type="submit"
            >
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};
const CityOptions = ({ cities }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {cities
        ? cities.map((city) => (
            <option key={city.code} value={city.code}>
              {city.name}
            </option>
          ))
        : null}
    </>
  );
};
const DatesOptions = ({ dates }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {dates
        ? dates.map((date) => (
            <option key={date.dateBasic} value={date.dateBasic}>
              {date.dateCs}
            </option>
          ))
        : null}
    </>
  );
};
