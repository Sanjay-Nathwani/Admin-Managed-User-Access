const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
const adminlog = require("./schema/adminlog");
require("dotenv").config();

app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json({ limit: "50mb" }));

app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log("mongodb not connected",error.message));

app.post("/admin-insert",async(req,res) => {
  const {name,pass} = req.body;

  try {
    const val = await adminlog.create({ name: name, pass: pass });
    if (val) {
      return res.status(200).send({ msg: "inserted" });
    } else {
      return res.status(200).send({ msg: "not inserted" });
    }
  } catch (e) {
    console.log(e.message);
  }

})

app.post("/check", async (req, res) => {
  const { name,pass } = req.body;
  try {
    const val = await adminlog.findOne({ name: name, pass: pass });
    if (val) {
      return res.status(200).send({ msg: "exist" });
    } else {
      return res.status(200).send({ msg: "not" });
    }
  } catch (e) {
    console.log(e.message);
  }

  res.send({ msg: "sanjay" });
});

app.use("/createId", require("./router/adminlogin"));


app.listen(3030, () => {
  console.log("Server is running on port 3030")
});
