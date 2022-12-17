import bcrypt from 'bcrypt'; //this will allow us to encrypt our password
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js"

/**REGISTER USER */
/**
 * this has to be asynchronous as we are making a call to the mongo database
 * This happens when u call the frontend to backend and backend to database
 * 
 * @param {*} req 
 * @param {*} res 
 */
export const register = async(req, res) => { //this is the callback function 
    try{
        //we are destructuring these parameters from the request body
        //from the frontend, we are sending the object with these parameters or arguments
        //from here we are going to grab all these
        const{
            firstName, 
            lastName, 
            email, 
            password, 
            picturePath, 
            friends, 
            location, 
            occupation
        } = req.body

        //we are going to create a random salt provided by Bcrypt and encrypt our password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({ //passing in an object
            firstName, 
            lastName, 
            email, 
            password: passwordHash, 
            picturePath, 
            friends, 
            location, 
            occupation, 
            viewedProfile: Math.floor(Math.random() * 10000), 
            impressions: Math.floor(Math.random() * 10000)
        })
        const savedUser = await newUser.save();
        //201 is created
        /**
         * USE POSTMAN to check
         */
        res.status(201).json(savedUser);
    }catch(err){

    }
}
