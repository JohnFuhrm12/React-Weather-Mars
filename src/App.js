import './App.css';
import axios from 'axios';
import React, {useState, useEffect, useRef} from "react";
import moment from "moment";

function App() {
    const [sol, setSol] = useState("");
    const [max_temp_C, setMax_Temp_C] = useState("");
    const [min_temp_C, setMin_Temp_C] = useState("");
    const [date_recorded, setDate_Recorded] = useState("");
    const [season, setSeason] = useState("");
    const [uvindex, setUVIndex] = useState("");
    const [pressure, setPressure] = useState("");
    const [sunrise, setSunrise] = useState("");
    const [sunset, setSunset] = useState("");

    axios.get('https://api.maas2.apollorion.com/').then(
      (response) => {
          const result = response.data;
          console.log(result);
          const current_date_recorded = result.terrestrial_date
          const current_conditions = result.atmo_opacity
          const current_sol = result.sol
          const current_season = result.season
          const current_min_temp_C = result.min_temp
          const current_max_temp_C = result.max_temp
          const current_uv = result.local_uv_irradiance_index
          const current_sunrise = result.sunrise
          const current_sunset = result.sunset
          const current_pressure = result.pressure
          setSol(current_sol);
          setMax_Temp_C(current_max_temp_C);
          setMin_Temp_C(current_min_temp_C);
          setDate_Recorded(moment(current_date_recorded).utc().format('YYYY-MM-DD'));
          setSeason(current_season);
          setUVIndex(current_uv);
          setPressure(current_pressure);
          setSunrise(current_sunrise);
          setSunset(current_sunset);
      },
  );

  function getDatafromXSol(sol) {
      axios.get(`https://api.maas2.apollorion.com/${sol}`).then(
        (response) => {
            const result = response.data;
            console.log(result);
            const date_recorded = result.terrestrial_date
            const conditions = result.atmo_opacity
            const sol = result.sol
            const season = result.season
            const min_temp_C = result.min_temp
            const max_temp_C = result.max_temp
            const uv = result.local_uv_irradiance_index
            const sunrise = result.sunrise
            const sunset = result.sunset
            const pressure = result.pressure
        },
    );
  };

  getDatafromXSol(35);

  return (
    <div className="page">
      <div className="main-block">
        <h1>Latest Mars Weather From Curiosity</h1>
        <h2>Current Location: Gale Crater</h2>
        <div className="first-info-block">
          <h1>Sol: {sol}</h1>
          <h1>Max Temp: {max_temp_C}°C</h1>
        </div>
        <div className="first-info-block">
          <h1>Date on Earth: {date_recorded}</h1>
          <h1>Min Temp: {min_temp_C}°C</h1>
        </div>
        <div className="second-info-block">
          <h1>Season: {season}</h1>
          <h1>UV Index: {uvindex}</h1>
        </div>
        <div className="third-info-block">
          <h1>Pressure: {pressure}</h1>
          <h1>Sunrise: {sunrise}</h1>
        </div>
        <div className="fourth-info-block">
          <h1>Sunset: {sunset}</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
