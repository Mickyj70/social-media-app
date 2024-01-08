require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const PORT = process.env.PORT || 3500;

//connect DB
connectDB();

// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// routes
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

mongoose.connection.once("open", () => {
  console.log("DB connected");

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
