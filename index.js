const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const eventsModel = require("./routes/eventModel");
const app = express();
const port = 4500;

//view engine
app.set("view engine", "ejs");

//body parser
app.use(express.urlencoded({ extended: false }));

//method override
app.use(methodOverride("_method"));

//database connection
mongoose
  .connect("mongodb://localhost:27017/revise")
  .then(() => {
    console.log("connection successfull...");
  })
  .catch((err) => {
    console.log(err);
  });

//getting routes for events
app.use("/", require("./routes/events"));

//getting routes for points
app.use("/", require("./routes/point"));

//route for main page
app.get("/", async (req, res) => {
  const data = await eventsModel.find().sort({ startDate: -1 });
  res.render("feed", { data });
});

app.listen(port);
