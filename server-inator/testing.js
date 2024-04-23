const express = require("express");
const mongoose = require("mongoose");
const CustomerModel = require("./models/customer");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/CommunitySync")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const customer = await CustomerModel.create(req.body);
    res.json(customer);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while registering the customer" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await CustomerModel.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json("password incorrect");
      }
    } else {
      res.json("no user exists");
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
