import express from "express";
import Event from "../models/eventModel.js"; // Import your Event model
import User from "../models/user.js"; // Import your User model

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Retrieve the user's ID from the session (assuming you have it set up)
    const userId = req.session.userId;

    // Find the user by ID and populate the `CreatedEvents` field to get event IDs
    const user = await User.findById(userId).populate("CreatedEvents");

    // Extract event IDs from the user object
    const eventIds = user.CreatedEvents.map((event) => event._id);

    // Find events using the extracted event IDs
    const events = await Event.find({ _id: { $in: eventIds } });

    // Render the 'created.ejs' template and pass the events to it
    res.render("created", { events });
  } catch (error) {
    // Handle any errors that occur
    console.error("Error fetching created events:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
