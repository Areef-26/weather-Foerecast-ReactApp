import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import CityComponent from "./modules/CityComponent";
import WeatherComponent from "./modules/WeatherInfoComponent";


const myStyle = {
  backgroundImage: "url(data:image/jpeg;base64,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)",
  height: "100vh",
  marginTop: "-70px",
  fontSize: "50px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 #555;
  background: skyblue;
  font-family: Montserrat;
  text-color:red;
`;

const AppLabel = styled.span`
  color: blue;
  margin: 20px auto;
  font-size: 25px;
  font-weight: bold;
`;
const CloseButton = styled.span`
  padding: 2px 3px;
  background-color: black;
  border-radius: 50%;
  color: white;
  position: absolute;
`;

function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`,
    );
    updateWeather(response.data);
  };

  return (
    <>
    
    <Container>
      <div style={myStyle}>
        <h1>GeeksForGeeks</h1>
      </div>
      <AppLabel>Weather Forecast</AppLabel>
      {city && weather ? (
        <WeatherComponent weather={weather} city={city} />
      ) : (
        <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
      )}
    </Container>
    </>
  );
}

export default App;
