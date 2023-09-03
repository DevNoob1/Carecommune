import express from "express";
import User from "../models/user.js";
const router = express.Router()
// Other app configurations...

router.get("/:eventId", async (req, res) => {
  try {
    const userId = req.session.userId; // Get the user's ID from the session
    const eventId = req.params.eventId; // Get the event ID from the URL

    // Find the user by ID and update their 'JoinedEvents' property
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { JoinedEvents: eventId }, // Add the event ID to the 'JoinedEvents' array
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.redirect("/joined");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
