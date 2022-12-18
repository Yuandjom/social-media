import express from 'express'
import {login} from '../controllers/authController.js'

// Setting up a router
//This piece of code will allow express to identify that these Routes will all be configured
const router = express.Router();

//this will be the prefix for the auth, so it will be auth/login from the app.use() 
router.post("/login", login);

export default router