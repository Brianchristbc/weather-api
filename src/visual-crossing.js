export function submitForm() {
  const inputField = document.getElementById("location-input");
  const inputValue = inputField.value;
  loadWeather(inputValue);
  inputField.value = "";
}

async function loadWeather(inputValue) {
  try {
    console.log(inputValue);
    const weatherData = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        inputValue +
        "?unitGroup=metric&key=4GM67NLGQL7JQ2AMLCLFNMU2T"
    );
    if (!weatherData.ok) {
      throw new Error("Bad response: " + weatherData.status);
    }
    let weatherJson = await weatherData.json();
    weatherJson = {
      location: weatherJson.resolvedAddress,
      temperature: weatherJson.currentConditions.temp,
      conditions: weatherJson.currentConditions.conditions,
      humidity: weatherJson.currentConditions.humidity,
    };
    console.log(weatherJson);
    const weatherOutput = document.querySelector(".weather-output");
    const locationOutput = document.querySelector(".location");
    locationOutput.innerText = weatherJson.location;
    weatherOutput.appendChild(locationOutput);
    const temperatureOutput = document.querySelector(".temperature");
    temperatureOutput.innerText = weatherJson.temperature + "°C";
    weatherOutput.appendChild(temperatureOutput);
    const humidityOutput = document.querySelector(".humidity");
    humidityOutput.innerText = "Humidity: " + weatherJson.humidity + "%";
    weatherOutput.appendChild(humidityOutput);
    const conditionsOutput = document.querySelector(".conditions");
    conditionsOutput.innerText = weatherJson.conditions;
    weatherOutput.appendChild(conditionsOutput);
    const cta = document.querySelector(".call-to-action");
    cta.innerText = "Curious about another location?";
  } catch (error) {
    alert(inputValue + " is not a valid location, try something else!");
    console.log(error);
  } finally {
    console.log("Weather has been printed");
  }
}
