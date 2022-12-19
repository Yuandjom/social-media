//create our model using the Schema
import mongoose from "mongoose";

//first create the Schema
const postSchema = new mongoose.Schema(
  {
    //these will have all the attributes with the validation checks
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      //check if the userId exist in this map and the value is going to be true always if it exist
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

//next pass it into the model
//this is the mongoose template
const Post = mongoose.model("Post", postSchema);

export default Post;
