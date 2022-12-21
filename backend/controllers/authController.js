import bcrypt from "bcrypt"; //this will allow us to encrypt our password
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/**REGISTER USER */
/**
 * this has to be asynchronous as we are making a call to the mongo database
 * This happens when u call the frontend to backend and backend to database
 *
 * @param {*} req
 * @param {*} res
 *
 * @description Register a new user
 * @route       POST  /auth/register
 * @access      Public
 *
 */
export const register = async (req, res) => {
  //this is the callback function
  try {
    //we are destructuring these parameters from the request body
    //from the frontend, we are sending the object with these parameters or arguments
    //from here we are going to grab all these
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    //we are going to create a random salt provided by Bcrypt and encrypt our password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    //201 is created
    /**
     * USE POSTMAN to check
     *
     * Set the Postman to POST
     * url: http://localhost:3001/auth/register
     *
     * Go to Body
     * - enter the key and values
     */
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**LOGGING IN FUNCTION
 * @description Login a user
 * @route       POST /auth/login
 * @access      Public
 */
export const login = async (req, res) => {
  try {
    //destructure the email and password from req.body
    const { email, password } = req.body;
    //we are using mongoose to try and find the one that has the specified email
    //this will bring back all the user information into the user
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist. " });
    }
    //isMatch if we match the password
    //compare the password the user send and the password that has been saved in the database
    //they are both going to use the same salt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    //if everything is okay, we will use the token for authetication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //remember to remove/delete the password so it doesnt get send back to the frontend
    delete user.password;
    res.status(200).json({ token, user }); //this is where they return the token + the user stuff
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
