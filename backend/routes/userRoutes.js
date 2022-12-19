import express from "express";
//import the controllers
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

//Set up the router
const router = express.Router();

/**READ route */
/**
 * since we created the route app.use("/users", userRoutes) in server.js
 * This route is going to be /users/:id some id, this also means that the frontend
 * is going to send some user id and we can grab the user id and call our database with that
 * particular id. Thus, this is known as query string
 *
 */
//read the comments above
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/**UPDATE route
 * we are getting the current user who is logged in and the friend who we want to add or remove
 * should update be patch or put
 * When a client needs to replace an existing Resource entirely,
 * they can use PUT.
 *
 * When they're doing a partial update, they can use HTTP PATCH.
 */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
