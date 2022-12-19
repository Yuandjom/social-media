import e from "express";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

/**CREATE */
/**
 *
 * @param {*} req
 * @param {*} res
 *
 * @description Create a post
 * @route       POST /posts (note that this is from the server.js)
 * @access      Private
 */
export const createPost = async (req, res) => {
  try {
    //this is all from the frontend,
    //we just need the userId, description and picturePath
    const { userId, description, picturePath } = req.body;
    //user information
    const user = await User.findById(userId);
    //create our new post into our MONGODB database
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    //this is to make sure we save it into mongoDB
    await newPost.save();
    /**
     * FUNCTION: grabbing all the post,
     * Once we grab a post, we NEED all the post to return to the frontend
     * This means that the frontend has a list of the updated post.
     * The newsfeed is updated with the person post
     */
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    //note that 409 is an error creating it
    res.status(409).json({ message: error.message });
  }
};

/**READ */
/**
 *
 * @param {*} req
 * @param {*} res
 *
 * @description Get Feed posts
 * @route       Get /posts/ (note that this is from the postRoutes.js)
 * @access      Private
 */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * @description Get User posts
 * @route       Get /posts/:userId/posts (note that this is from the postRoutes.js)
 * @access      Private
 */
export const getUserPosts = async (req, res) => {
  try {
    //grab the userId
    const { userId } = req.params; //grab from the URL
    //find the post by the userId
    const post = await Post.find({ userId });
    //send the post back
    res.status(201).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**UPDATE */
/**
 *
 * @param {*} req
 * @param {*} res
 *
 * @description Like the post by updating it
 * @route       PATCH  /posts/:id/:friendId
 * @access      Private
 */
export const likePost = async (req, res) => {
  try {
    //grab the id from the req.params
    const { id } = req.params; //this comes from the query string
    const { userId } = req.body; //userId comes from the body of the request
    const post = await Post.findById(id);

    //this is basically we are going to check in the likes that if the userId exist
    //if the userId exist, that means the post has been liked by that particular person
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      //if it does not exist
      post.likes.set(userId, true);
    }
    //this is basically find the id and update the likes
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      //this is the list of likes that we modify
      //passing in the new likes
      { likes: post.likes },
      { new: true }
    );
    //this is updating the frontend
    /**
     * REMEMBER to update the frontend once we hit the like button
     */
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
