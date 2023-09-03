import express from "express";
import Event from "../models/eventModel.js";
import User from "../models/user.js"; // Import your User model

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("makeevent");
});

router.post("/", async (req, res) => {
  // Retrieve the form data from the request body
  const eventData = req.body;

  try {
    // Create a new event instance using the Event model
    const newEvent = new Event(eventData);

    // Save the new event to the database
    await newEvent.save();

    // Get the user's ID from the session (assuming you have this set up)
    const userId = req.session.userId;

    // Update the user's "CreatedEvents" property with the new event ID
    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { CreatedEvents: newEvent._id }, // Add the event ID to the 'CreatedEvents' array
      },
      { new: true }
    );

    // Redirect to a success page or send a response indicating success
    res.redirect("/events");
  } catch (error) {
    // Handle any errors that occur during the save process
    console.error("Error creating event:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
