import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first name is required!"],
    },
    last_name: {
      type: String,
      required: [true, "last name is required!"],
    },
    bio: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
    user_id: {
      type: String,
      required: [true, "User Id is required!"],
      unique: [true, "User Id already eixsts!"],
    },
    email: {
      type: String,
      required: [true, "email is required!"],
      unique: [true, "email already eixsts!"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    account_type: {
      type: String,
      enum: ["Admin", "Employee"],
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    certificates: [
      {
        certificate_title: String,
        certificate_url: String,
      },
    ],
    posts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "DbPost",
      },
    ],
  },
  { timestamps: true }
);

export const DbUser = mongoose.model("DbUser", schema);
