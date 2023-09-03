// Import required packages
import dotenv from "dotenv"
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import authRoute from "./routes/auth.js"
import homeRoute from "./routes/home.js"
import eventRoute from "./routes/events.js"
import addeventRoute from "./routes/makeevent.js";
import joineventRoute from "./routes/joinevent.js"
import createdRoute from "./routes/Created.js";
import JoinedRoute from "./routes/Joined.js";
import bodyParser from "body-parser";

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve static files from the "public" folder
app.use(express.static("public"));

app.use(
  session({
    secret: "your-secret-key", // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: false,
  })
);

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  const requireLogin = (req, res, next) => {
    if (req.session && req.session.userId) {
      // If the user is logged in (user ID is stored in the session), proceed to the next middleware/route
      next();
    } else {
      // If the user is not logged in, redirect to the login page
      res.redirect("/auth"); // Replace "/auth" with the URL of your login page
    }
  };

// Define routes
app.use("/auth", authRoute);
app.use("/",requireLogin,homeRoute);
app.use("/events",requireLogin,eventRoute);
app.use("/addEvent", requireLogin, addeventRoute);
app.use("/join-event", requireLogin, joineventRoute);
app.use("/created",requireLogin,createdRoute);
app.use("/joined", requireLogin, JoinedRoute);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
