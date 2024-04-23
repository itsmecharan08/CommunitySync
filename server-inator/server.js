require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const customer = require("./models/customer");
const supplier = require("./models/supplier");
const service = require("./models/service");

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

app.post("/client/auth", async (req, res) => {
  try {
    const found = await customer.findOne({ email: req.body.email });
    if (found) {
      return res.json({ status: "Error", error: "Duplicate Email" });
    } else {
      const customerData = {};
      for (const key in req.body) {
        if (req.body.hasOwnProperty(key) && req.body[key]) {
          customerData[key] = req.body[key];
        }
      }
      customerData[password] = await bcrypt.hash(req.body.password, 10);
      await customer.create(customerData);
      return res.json({
        status: "Success",
        message: "Customer created successfully",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ status: "Error", error: "Internal Server Error" });
  }
});

// app.get("/demo", (req, res) => {
//   console.log("Get requested received");
//   res.send("Demo");
// });

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
