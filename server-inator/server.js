require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_LOCAL_URL, {})
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error occured" + err);
  });

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
