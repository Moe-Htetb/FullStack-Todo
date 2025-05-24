import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
  },
});

export const Todos = mongoose.model("Todos", todoSchema);
