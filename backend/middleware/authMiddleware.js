import jwt from 'jsonwebtoken'
// the next parameter is to let the function continue 
export const verifyToken = async(req, res, next) => {
    try {
        /**
         * from the request in the frontend, we are grabbing the authorization header 
         * where the token will be set and we are grabbing it 
         * 
         * */
        let token = req.header("Authorization");

        if(!token){
            //this handles the case where the token does not exist
            return res.status(403).send("Access Denied")
        }
        //if the token starts with the Bearer string 
        if(token.startsWith("Bearer ")){
            //basically the token will be placed after the space in Bearer and we are grabbing it 
            token = token.slice(7, token.length).trimLeft();
        }

        //this is where we check with the jwt
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        //TODO this will return the user and password??
        req.user = verified
        //this will proceed to the next step of the function 
        next();

    } catch (error) {
        res.status(500).json({error: err.message})
    }
}