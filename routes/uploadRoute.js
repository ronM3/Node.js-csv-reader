const express = require("express");
const multer = require("multer");
const csv = require("fast-csv");
const router = express.Router();
const path = require("path");
const upload = multer({ dest: "tmp/csv/"});
const fs = require("fs");


// sending csv file thourgh postman and response the file as array
router.post("/", upload.single("file"), function (req, res) {
  const fileRows = [];
  // open uploaded file
  csv.parseFile(req.file.path, { skipRows: 1})
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      console.log(fileRows);
      res.json(fileRows)
      fs.unlinkSync(req.file.path);
    });
});

module.exports = router;
