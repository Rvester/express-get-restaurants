const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//TODO: Create your GET Request Route Below:
app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll({});
  res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findByPk(`${id}`);

  res.json(restaurant);
});

//POST
app.post("/restaurants", async (req, res) => {
  const { name, location, cuisine } = req.body;

  const newRestaurant = await Restaurant.create({
    name: name,
    location: location,
    cuisine: cuisine,
  });

  res.json(newRestaurant);
});

module.exports = app;
