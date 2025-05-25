import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
});

export const Todos = mongoose.model("Todos", todoSchema);
