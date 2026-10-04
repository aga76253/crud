const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db");

const app = express();

app.use(express.json());

connectDB();


// Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  age: {
    type: Number,
  },
});


// Model
const User = mongoose.model("User", userSchema);



// CREATE

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);

  res.json(user);
});



// READ

app.get("/users", async (req, res) => {
  const users = await User.find();

  res.json(users);
});


// READ SINGLE

app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json(user);
});



// UPDATE
app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(user);
});



// DELETE
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "User deleted successfully",
  });
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});