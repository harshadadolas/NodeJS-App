import { useState } from "react";
import axios from "../axiosInstance";

const SearchBar = ({ setWeatherData }) => {
  const [city, setCity] = useState("");

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`/weather?city=${city}`);
      setWeatherData(res.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border px-4 py-2"
      />
      <button onClick={fetchWeather} className="bg-blue-500 text-white px-4 py-2 ml-2">
        Search
      </button>
    </div>
  );
};

export default SearchBar;