/** @format */

console.log("CLient side javascript file is loaded!");
const address = document.getElementById("location");
const forecast = document.getElementById("forecast");

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  address.innerHTML = "Loading....";
  forecast.innerHTML = "";
  let location = document.getElementById("weatherSearch");
  getForecast(location.value);
});

const getForecast = (location) => {
  fetch(`http://localhost:3000/weather?location=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          address.innerHTML = data.error;
        } else {
          address.innerHTML = data.location;
          forecast.innerHTML = data.forecast;
        }
      });
    },
  );
};
