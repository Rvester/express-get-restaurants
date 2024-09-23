const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:
app.get("/restauraunts", async (req, res) => {
  const restauraunts = await Restaurant.findAll({});
  res.json(restauraunts);
});

module.exports = app;
