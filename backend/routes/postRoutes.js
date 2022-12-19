import express from "express";
//these are the controllers
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

//initialise the router
const router = express.Router();

/**READ */
/**
 * since we created the route app.use("/posts", postRoutes) in server.js
 * This is going to be /posts/
 *
 * What this does is that it is going to grab the user feed from the homepage.
 * The homepage is going to curate/sending all the post
 */
router.get("/", verifyToken, getFeedPosts);

/**
 * since we created the route app.use("/posts", postRoutes) in server.js
 * This is going to be /posts/:userId/posts
 *
 * What this does is that it is going to grab THAT relevant USER post only
 */
router.get("/:userId/posts", verifyToken, getUserPosts);

/**UPDATE */
/**
 * since we created the route app.use("/posts", postRoutes) in server.js
 * This is going to be /posts/:id/like
 *
 * What this does is that it is like that post and unliking it
 */
router.patch("/:id/like", verifyToken, likePost);

export default router;
