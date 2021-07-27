/** @format */
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/foreCast");

const app = express();
const PORT = process.env.PORT || 3000;
//TODO:Define Paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//TODO: Setup handlebars engine and views
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//TODO: Static directory to serve
app.use(express.static(publicDirectory));
const name = "Swayambhu Dhuri";

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    paragraph: "THis is a help para",
    name,
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "Please enter the location",
    });
  }

  geocode(
    req.query.location,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: `${forecastData.weather_descriptions[0]}. It is currently ${forecastData.temperature} degree out. But it feels like it is ${forecastData.feelslike} degree out.`,
          location,
          address: req.query.location,
        });
      });
    },
  );

  // res.send({
  //   forecast: "It is snowing",
  //   location: req.query.location,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    desc: "Help article not found",
    name,
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    desc: "Page Not found",
    name,
  });
});

app.listen(PORT, () => console.log("Express server listening on port "+ PORT));
