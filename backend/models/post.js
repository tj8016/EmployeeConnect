import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
    },
    image_url: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "DbUser",
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "DbUser",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "DbUser",
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const DbPost = new mongoose.model("DbPost", expenseSchema);
