const express = require("express");
const mongoose = require("mongoose");
const eventsModel = require("./routes/eventModel");
const app = express();
const port = 4500;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/revise")
  .then(() => {
    console.log("connection successfull...");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", async (req, res) => {
  const data = await eventsModel.find().sort({ startDate: -1 });
  res.render("feed", { data });
});

app.get("/create-event", (req, res) => {
  res.render("create");
});

app.post("/save", (req, res) => {
  const createDoc = async () => {
    try {
      const apprec = new eventsModel({
        title: req.body.title,
        description: req.body.description,
        points: req.body.points,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      });
      const blog = await eventsModel.insertMany([apprec]);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  };
  createDoc();
});
app.listen(port);
