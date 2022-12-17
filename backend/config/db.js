/**
 * I have no idea why it does not work here
 * 
 */

//bring in mongoose
import mongoose from "mongoose";
//function 
const connectDB = async() => {
    try {
        //establish a connect and return a promise 
        //note that the env file should be the global 
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        //give the mongoDB host that we are connected to 
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}
//exporting the connectDB function 
export default connectDB