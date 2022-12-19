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
export const getFeedPosts = async (req, res) => {
  try {
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {};
