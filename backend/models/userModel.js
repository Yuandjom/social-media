//create our model using the Schema
import mongoose from "mongoose";

//first create the Schema
const userSchema = new mongoose.Schema(
  {
    //these will have all the attributes with the validation checks
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true, //this ensures that each email is unique
    },
    password: {
      type: String,
      required: true,
      max: 50,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  {
    timestamps: true,
  }
);

//next pass it into the model
const User = mongoose.model("User", userSchema);

export default User;
