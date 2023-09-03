import express from "express";
import Event from "../models/eventModel.js";
import axios from "axios";

const router = express.Router();

async function getEventImage(eventType) {
  const accessKey = process.env.pexels;

  // Make sure this environment variable is set
  const response = await axios.get(
    `https://api.pexels.com/v1/search?query=${eventType}`,
    {
      headers: {
        Authorization: accessKey,
      },
    }
  );

  const images = response.data.photos;

  if (images.length === 0) {
    throw new Error(`No images found for ${eventType}`);
  }

  // Find an image that's close to 1920 x 1080 pixels
  const desiredWidth = 2160;
  const desiredHeight = 1444;

  const suitableImages = images.filter(
    (image) => image.width >= desiredWidth && image.height >= desiredHeight
  );

  if (suitableImages.length === 0) {
    throw new Error(`No suitable images found for ${eventType}`);
  }

  const selectedImage =
    suitableImages[Math.floor(Math.random() * suitableImages.length)];
  const imageUrl = selectedImage.src.original;

  return imageUrl;
}


router.get("/", async (req, res) => {
  try {
    // Fetch all events from the database
    const events = await Event.find();

    // Assign image URLs to events
    for (const event of events) {
      if (event.ImageUrl==="") {
        event.ImageUrl = await getEventImage(event.Type);
        // console.log(await getEventImage(event.type))
        await event.save();
      }
    }

    res.render("events", { events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
