import mongoose from "mongoose";

const { Schema, model } = mongoose;

const EventSchema = Schema(
  {
    eventName: {
      type: String,
      required: [true, "Please provide the event name"],
    },
    eventImage: {
      type: String,
      required: [true, "Please provide the event image"],
    },
    date: {
      type: String,
      required: [true, "Please provide the date"],
    },
    description: {
      type: String,
      required: [true, "Please provide the description"],
    },
    branch: {
      type: String,
      required: [true, "Please provide the branch"],
    },
  },
  { timestamps: true }
);

const Event = model("Event", EventSchema);

export default Event;