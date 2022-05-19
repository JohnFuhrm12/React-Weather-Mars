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
    const [conditions, setConditions] = useState("");
    const [sol_x, setSol_X] = useState("");
    const [current, setCurrent] = useState(true);

    const [sol_x2, setSol_X2] = useState("");
    const [max_temp_C_x, setMax_Temp_C_X] = useState("");
    const [min_temp_C_x, setMin_Temp_C_X] = useState("");
    const [date_recorded_x, setDate_Recorded_X] = useState("");
    const [season_x, setSeason_X] = useState("");
    const [uvindex_x, setUVIndex_X] = useState("");
    const [pressure_x, setPressure_X] = useState("");
    const [sunrise_x, setSunrise_X] = useState("");
    const [sunset_x, setSunset_X] = useState("");
    const [conditions_x, setConditions_X] = useState("");

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
          setConditions(current_conditions);
      },
  );

  function getDatafromXSol(sol_x) {
    axios.get(`https://api.maas2.apollorion.com/${sol_x}`).then(
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
            setSol_X2(current_sol);
            setMax_Temp_C_X(current_max_temp_C);
            setMin_Temp_C_X(current_min_temp_C);
            setDate_Recorded_X(moment(current_date_recorded).utc().format('YYYY-MM-DD'));
            setSeason_X(current_season);
            setUVIndex_X(current_uv);
            setPressure_X(current_pressure);
            setSunrise_X(current_sunrise);
            setSunset_X(current_sunset);
            setConditions_X(current_conditions);
        },
    );
  };

  function handleChange(e) {
    setSol_X(e.target.value);
    setCurrent(false);
  };

  return (
    <div className="page">
      <div className="header">
        <h1>React Weather Mars</h1>
        <h1>Sol:</h1>
        <textarea placeholder="Type a number..." onChange={handleChange} value={sol_x}></textarea>
        <button onclick={getDatafromXSol(sol_x)}></button>
      </div>
      <div className="main-block">
        <h1>Latest Mars Weather From Curiosity</h1>
        <h2>Current Location: Gale Crater</h2>
        <div className="first-info-block">
          {current === true ? <h1>Sol: {sol}</h1> : <h1>Sol: {sol_x2}</h1>}
          {current === true ? <h1>Max-Temp: {max_temp_C}°C<img className="exclamation-img" src={require("./temp-high.png")}/></h1> : <h1>Max-Temp: {max_temp_C_x}°C<img className="exclamation-img" src={require("./temp-high.png")}/></h1>}
        </div>
        <div className="first-info-block">
          {current === true ? <h1>Date on Earth: {date_recorded}</h1> : <h1>Date on Earth: {date_recorded_x}</h1>}
          {current === true ? <h1>Min-Temp: {min_temp_C}°C<img className="exclamation-img" src={require("./temp-low.png")}/></h1> : <h1>Min-Temp: {min_temp_C_x}°C<img className="exclamation-img" src={require("./temp-low.png")}/></h1> }
        </div>
        <div className="second-info-block">
          {current === true ? <h1>Conditions: {conditions}</h1> : <h1>Conditions: {conditions_x}</h1>}
          {current === true ? <h1>UV Index: {uvindex}<img className="uv-img" src={require("./exclamation-mild.png")}/></h1> : <h1>UV Index: {uvindex_x}<img className="uv-img" src={require("./exclamation-mild.png")}/></h1>}
        </div>
        <div className="third-info-block">
          {current === true ? <h1>Pressure: {pressure}</h1> : <h1>Pressure: {pressure_x}</h1> }
          {current === true ? <h1>Sunrise: {sunrise}<img className="sun-img" src={require("./sunrise.png")}/></h1> : <h1>Sunrise: {sunrise_x}<img className="sun-img" src={require("./sunrise.png")}/></h1>}
        </div>
        <div className="fourth-info-block">
          {current === true ? <h1>Sunset: {sunset}<img className="sun-img" src={require("./sunset.png")}/></h1> : <h1>Sunset: {sunset_x}<img className="sun-img" src={require("./sunset.png")}/></h1>}
        </div>
      </div>
    </div>
  );
}

export default App;
