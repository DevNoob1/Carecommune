import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  JoinedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  CreatedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

// Create the model using the schema
const User = mongoose.model("User", UserSchema);

export default User;
