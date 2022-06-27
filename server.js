const express = require("express");
const dotenv = require("dotenv");
const app = express();
const playerRoutes = require("./routes/playerRoute");
const uploadRoute = require("./routes/uploadRoute")
dotenv.config();

app.use("/player", playerRoutes);
app.use('/upload-csv', uploadRoute);


const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
