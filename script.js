const apiKey = "352b4bfa790d49554b9caf74e50c34ce";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

// Fetch weather data for a city
const fetchWeather = async (city) => {
  try {
    const response = await fetch(`${baseUrl}&q=${city}&appid=${apiKey}`);
    if (!response.ok) throw new Error(`City not found: ${city}`);
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

// Update the main weather section
const updateWeatherInfo = async (city) => {
  const weatherData = await fetchWeather(city);
  const cityNameEl = document.getElementById("cityName");
  const weatherDataEl = document.getElementById("weatherData");

  if (weatherData) {
    cityNameEl.textContent = `Weather in ${weatherData.name}`;
    weatherDataEl.innerHTML = `
      Temperature: ${weatherData.main.temp}°C<br>
      Feels Like: ${weatherData.main.feels_like}°C<br>
      Min Temp: ${weatherData.main.temp_min}°C<br>
      Max Temp: ${weatherData.main.temp_max}°C<br>
      Weather: ${weatherData.weather[0].description}
    `;
  } else {
    cityNameEl.textContent = "City not found!";
    weatherDataEl.textContent = "Please try searching for another city.";
  }
};

// Update weather info for common cities
const commonCities = ["Delhi", "Mumbai", "Kolkata", "Bengaluru", "Chennai"];
const updateCommonCitiesWeather = async () => {
  const container = document.getElementById("commonCitiesWeather");
  container.innerHTML = ""; // Clear previous content

  for (const city of commonCities) {
    const weatherData = await fetchWeather(city);
    if (weatherData) {
      const card = `
        <div class="col-md-4 my-2">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${city}</h5>
              <p class="card-text">
                Temp: ${weatherData.main.temp}°C<br>
                Feels Like: ${weatherData.main.feels_like}°C<br>
                Weather: ${weatherData.weather[0].description}
              </p>
            </div>
          </div>
        </div>`;
      container.innerHTML += card;
    }
  }
};

// Event listener for search form
document.getElementById("cityForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const city = document.getElementById("cityInput").value.trim();
  if (city) updateWeatherInfo(city);
});

// Initial load for common cities
updateCommonCitiesWeather();
