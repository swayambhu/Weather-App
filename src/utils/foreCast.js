/** @format */
const request = require('postman-request')
const foreCast = (lat, long, callback) => {
  const URL = `http://api.weatherstack.com/current?access_key=27362f2e5213724f55f5507a1f3eafdc&query=${lat},${long}`;
  request({ url: URL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } =
        response.body.current;
      callback(undefined, { weather_descriptions, temperature, feelslike });
    }
  });
};

module.exports = foreCast;