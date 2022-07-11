const express = require("express");
const route = express.Router();

//for creating new event
route.get("/create-event", (req, res) => {
  res.render("create");
});

//saving new event to database
route.post("/save", (req, res) => {
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

//deleting an event
route.delete("/:id", async (req, res) => {
  await eventsModel.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = route;
