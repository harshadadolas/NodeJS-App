const WeatherWidget = ({ data }) => {
    return (
      <div className="mt-4 p-4 border rounded">
        <h2 className="text-xl font-bold">Weather Details</h2>
        <p>Temperature: {data.temperature}°C</p>
        <p>Humidity: {data.humidity}%</p>
        <p>Wind Speed: {data.windSpeed} km/h</p>
      </div>
    );
  };
  
  export default WeatherWidget;