const bodyDiv = document.querySelector(".content");
const condition = document.querySelector(".condition");
const temperature = document.querySelector(".temperature");
const loc = document.querySelector(".location");
const feelsLike = document.querySelector(".feels-like");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const search = document.querySelector(".city");
const error = document.querySelector(".error");

const showError = () => {
  console.log("error");
};

const processData = (data) => {
  return {
    condition: data.current.condition.text,
    temp: data.current.temp_f,
    location:
      data.location.country == "United States of America"
        ? `${data.location.name}, ${data.location.region}`
        : `${data.location.name}, ${data.location.country}`,
    feelslike: data.current.feelslike_f,
    wind: data.current.wind_mph,
    humidity: data.current.humidity,
  };
};

const displayData = (data) => {
  bodyDiv.style.visibility = "visible";
  console.log(data);
  bodyDiv.classList.remove("opacity-change-1");
  bodyDiv.classList.add("opacity-change-2");
  condition.textContent = data.condition;
  temperature.textContent = `${data.temp}°F`;
  loc.textContent = data.location;
  feelsLike.textContent = data.feelslike;
  wind.textContent = data.wind;
  humidity.textContent = data.humidity;
  bodyDiv.focus();
  bodyDiv.classList.remove("opacity-change-2");
  bodyDiv.classList.add("opacity-change-1");
};

document.querySelector(".search-button").addEventListener("click", async () => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=0321c27afcdb4aeca21204835231607&q=${search.value}&aqi=no`
  );
  if (response.status === 400) {
    error.style.visibility = "visible";
  } else {
    error.style.visibility = "hidden";
    const resJSON = await response.json();
    const processedData = processData(resJSON);
    displayData(processedData);
  }
});
