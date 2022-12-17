//get all the dependency stuff
/**
 * NOTE THAT CANNOT USE REQUIRE COS OF THE TYPE IN PACKAGE JSON
 */
// const express = require('express')
// const bodyParser  = require('body-parser')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const dotenv = require('dotenv').config()
// const multer = require('multer')
// const helmet = require("helmet")
// const path = require('path')
// const url = require('url')
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from "dotenv"
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from "path"
import { fileURLToPath } from 'url';
import {register} from './controllers/auth.js'
/**CONFIGURATION */
//Middleware configurations and other configurations
dotenv.config()

// we need to use this bc the package.json is import
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//to use the application
//initialise the app variable from express
const app = express();

//this is the middleware to have the body parser
app.use(express.json());
app.use(helmet());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())//cors is for resource sharing policies
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))) //this is stored locally

/**FILE STORAGE */
//these are from the github repo of multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

/**ROUTES WITH FILES */
//this means that if you want to register, you will have to call this api from the front 
/**
 * /auth/register is the endpoint route we are going to hit
 * middleware is the upload.single("picture")
 * register is the function where we save the data (controller)
 */
//app.post("/auth/register", upload.single("picture"), register)
app.post("/auth/register", register)

const upload = multer({storage})
/**MONGOOSE SETUP */
import connectDB from './config/db.js' // DB connection
const PORT = process.env.PORT || 6001

//connect to database
connectDB()

//listen to a specific port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

