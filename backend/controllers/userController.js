import User from "../models/userModel.js";

/**READ */
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @description Get a user 
 * @route GET /users/:id
 * @access Private (this is private because of the verifytoken in userRoutes)
 */

export const getUser = async(req, res) => {
    try {
        //we are going to grab the id from the req.params which is the query string
        const {id} = req.params;
        //use that particular id to grab the information of the user that we await
        const user = await User.findById(id)
        //send back to the frontend everything that is relevant to the user after we found it 
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @description Get user friends
 * @route       GET /users/:id/friends
 * @access      Private (this is private because of the verifytoken in userRoutes)
 */
//this will grab all the user friend based on the id you have specified
export const getUserFriends = async(req, res) => {
    //RMB to do the try catch block 
    try {
        //we are going to grab the id from the req.params which is the query string
        const {id} = req.params;
        //use that particular id to grab the information of the user that we await
        const user = await User.findById(id)

        //grab the friends
        //we use Promise.all because we are making multiple api calls to the database
        const friends = await Promise.all(
            //grab each id that the user has
            user.friends.map((id) => User.findById(id))
        );
        //format it nicely for the frontend 
        const formattedFriends = friends.map(
            //modifying our schema a bit before sending back to the frontend 
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                //return the object of all the things we just grab  
                return {_id, firstName, lastName, occupation, location, picturePath}
            }
        );
        //this is sending it back to the front 
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

/**UPDATE*/
/**
 * @description Add or Remove Friend
 * @route       PATCH /users/:id/:friendId
 * @access      PRIVATE
 */
export const addRemoveFriend = async (req, res) => {
    try {
        const {id, friendId } = req.params
        //this is grabbing the current user and all the user information 
        const user = await User.findById(id)
        const friend = await User.findById(friendId)
        /**
         * basically here is if one of them remove each other, both of them remove each other 
         */
        //Check to see if the friend id is included in the user friend id (the friend friendllist)
        //if they are include we want to make sure they are removed
        if(user.friends.includes(friendId)){
            //filter function is copy the same array everytime the id is not equal to the friendId 
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        } else{ //if they are not included, we are going to add them 
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save(); //save the updated list
        await friend.save();

        //grab the friends
        //we use Promise.all because we are making multiple api calls to the database
        const friends = await Promise.all(
            //grab each id that the user has
            user.friends.map((id) => User.findById(id))
        );
        //format it nicely for the frontend 
        const formattedFriends = friends.map(
            //modifying our schema a bit before sending back to the frontend 
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                //return the object of all the things we just grab  
                return {_id, firstName, lastName, occupation, location, picturePath}
            }
        );
        res.status(200).json(formattedFriends)

    } catch (error) {
        res.status(404).json({message: error.message})
    }
}