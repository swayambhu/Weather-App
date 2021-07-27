/** @format */
const request = require('postman-request')

const geoCode = (address, callback) => {
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic3dheWFtYmh1IiwiYSI6ImNrbzlta2gzcTB1ZWQycXFrZTd4Yjlzc3IifQ.odVnrKZPsYX76IjJq7g-YQ&limit=1`;
  request({ url: URL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the location services!", undefined);
    } else if (!response.body.features[0]) {
      callback(
        "Unable to fetch Latitude and longitude, Please check the spelling or place again.",
        undefined,
      );
    } else {
      const { center, place_name } = response.body.features[0];
      const longitude = center[0];
      const latitude = center[1];
      callback(undefined, {
        latitude,
        longitude,
        location: place_name,
      });
    }
  });
};

module.exports = geoCode