import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const port = 8080;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/basicproject")
  .then(() =>
    app.listen(port, () => console.log("server started at port " + port))
  )
  .catch((err) => console.log("Failed to connect to MongoDB", err));

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const messageModel = mongoose.model("Message", messageSchema);
const registerModel = mongoose.model("Register", userSchema);
const loginModel = mongoose.model("Login", loginSchema);

app.post("/sendMessage", (req, res) => {
  const dataToSave = new messageModel(req.body);
  dataToSave
    .save()
    .then((resp) => res.json("Data Submitted"))
    .catch((err) => res.status(500).json({ error: err }));
});

app.post("/registerMessage", async (req, res) => {
  let { name, email, userName, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  password = hashedpassword;
  const registerDataToSave = new registerModel({
    name,
    email,
    userName,
    password,
  });
  try {
    const savedData = await registerDataToSave.save();
    res.json("Data Submitted");
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post("/loginMessage", async (req, res) => {
  const usernameExists = await registerModel.findOne({
    userName: req.body.name,
  });

  if (usernameExists) {
    const passwordMatches = await bcrypt.compare(
      req.body.password,
      usernameExists.password
    );
    res.send(passwordMatches);
  } else {
    res.send(false);
  }
});

app.get("/getAllData", async (req, res) => {
  try {
    const dataFromDB = await registerModel.find();
    res.json(dataFromDB);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.delete("/deleteMessage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await messageModel.findByIdAndDelete(id);
    if (result) {
      res.json({ message: "Data Deleted" });
    } else {
      res.status(404).json({ message: "Data Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting data", error: err });
  }
});

app.put("/updateMessage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await messageModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (result) {
      res.json({ message: "Data Updated", data: result });
    } else {
      res.status(404).json({ message: "Data Not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating data", error: err });
  }
});

app.get("/search/:q", async (req, res) => {
  const temp = req.params.q;
  const searchTerm = temp.split("=")[1];

  try {
    const regex = new RegExp(searchTerm, "i");
    const results = await registerModel.find({ name: regex });
  // res.json(results);
  console.log(results)
  } catch (err) {
    res.status(500).json({ error: err });
  }
});