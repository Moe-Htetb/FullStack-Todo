import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

export const Todos = mongoose.model("Todos", todoSchema);
