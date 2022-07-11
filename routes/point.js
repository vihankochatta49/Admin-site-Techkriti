const express = require("express");
const userDb = require(".././routes/registerModels");
const imgDb = require(".././routes/models");
const route = express.Router();

//route for leader board
route.get("/leaderboard", async (req, res) => {
  const users = await imgDb.find();
  res.render("leaderboard", { users });
});

//route for details of user
route.get("/:name", async (req, res) => {
  const data = await imgDb.find({ name: req.params.name });
  res.render("userData", { data });
});

//routes for updating points
route.put("/update-points/:name/:title", async (req, res) => {
  try {
    const info = await imgDb.findOne({
      name: req.params.name,
      title: req.params.title,
    });
    const userInfo = await userDb.findOne({
      name: req.params.name,
    });
    if (info.points == 0) {
      await imgDb.updateMany(info, {
        $set: {
          points: req.body.points,
        },
      });
      var p1 = userInfo.points;
      var p2 = req.body.points;
      var total = parseInt(p1) + parseInt(p2);
      console.log(total);
      await userDb.updateMany(userInfo, {
        $set: {
          points: total,
        },
      });
    } else {
      var p1 = userInfo.points;
      var p3 = info.points;
      var p2 = req.body.points;
      var total = p1 - p3;
      await imgDb.updateMany(info, {
        $set: {
          points: req.body.points,
        },
      });
      total = total + parseInt(p2);
      await userDb.updateMany(userInfo, {
        $set: {
          points: total,
        },
      });
    }
    res.redirect(`/${req.params.name}`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = route;
