const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

// Connect to db
connectDB();

// Bring the routes
const transactions = require("./routes/transactions");

// Start app
const app = express();

// CORS Middleware - To allow requests from any origin
// Set up a whitelist and check against it:
const whitelist = ["https://money-manager-app.now.sh"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));

// Bodyparser Middleware to send data
app.use(express.json());

// Morgan Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount the router
app.use("/api/v1/transactions", transactions);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
