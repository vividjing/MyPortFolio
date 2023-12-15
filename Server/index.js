const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Message = require("./Message.js");

// CONFIGURATION

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// Routes
app.post("/api/message", async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(200).json(message);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Mongoose setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port:${PORT}`));
  })
  .catch((error) => console.log(error));

module.exports = app;
