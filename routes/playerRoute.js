const express = require("express");
const router = express.Router();
const axios = require("axios");
const csv = require("fast-csv");
const path = require("path");
const asyncHandler = require("express-async-handler");
const cacheMiddleware = require("../middlewares/cacheMiddleware");
const creatingCsv = require('../service/createCsv')

router.get("/:id",cacheMiddleware,asyncHandler(async (req, res, next) => {
    const playerId = req.params.id;
    const newpath = __dirname + "/../tmp/csv";
    const fileName = playerId;

    try {
      const { data } = await axios.get(
        `${process.env.API_KEY}${playerId}`
      );
      if (data) {
        res.json({
          data,
        });
      }
      creatingCsv(data, csv, path, newpath, fileName)
    } catch (error) {
      res.status(404);
      throw new Error("Player not found" + error);
    }
  })
);

module.exports = router;
