import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  ImageUrl:{
    type: String,
    default:""
  },
   EventDate: {
    type: Date,
    required: true,
  },
  EventTime: {
    type: String, // Storing time as a string
    required: true,
  },
});

// Create the model using the schema
const Event = mongoose.model("Event", EventSchema);

export default Event;
